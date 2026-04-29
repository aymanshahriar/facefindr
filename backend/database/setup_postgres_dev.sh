#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

DB_NAME="${DB_NAME:-facefindr}"
DB_USER="${DB_USER:-facefindr_user}"
DB_PASSWORD="${DB_PASSWORD:-strong_password}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
SQL_FILE="${SQL_FILE:-$ROOT_DIR/backend/database/database.sql}"
INSTALL_POSTGRES="${INSTALL_POSTGRES:-true}"

require_identifier() {
  local value="$1"
  local label="$2"
  if [[ ! "$value" =~ ^[a-zA-Z_][a-zA-Z0-9_]*$ ]]; then
    echo "Error: $label must match [a-zA-Z_][a-zA-Z0-9_]*, got '$value'." >&2
    exit 1
  fi
}

escape_sql_literal() {
  local value="$1"
  printf "%s" "${value//\'/\'\'}"
}

run_as_postgres() {
  sudo -u postgres psql -v ON_ERROR_STOP=1 "$@"
}

require_identifier "$DB_NAME" "DB_NAME"
require_identifier "$DB_USER" "DB_USER"

if [[ ! -f "$SQL_FILE" ]]; then
  echo "Error: SQL file not found at '$SQL_FILE'." >&2
  exit 1
fi

echo "==> Preparing PostgreSQL for local development"

if ! command -v psql >/dev/null 2>&1; then
  if [[ "$INSTALL_POSTGRES" != "true" ]]; then
    echo "Error: psql not found and INSTALL_POSTGRES=false." >&2
    exit 1
  fi

  if command -v apt-get >/dev/null 2>&1; then
    echo "==> Installing PostgreSQL packages"
    sudo apt-get update
    sudo apt-get install -y postgresql postgresql-contrib
  else
    echo "Error: psql not found and this script only auto-installs on apt-based systems." >&2
    exit 1
  fi
fi

echo "==> Ensuring PostgreSQL service is running"
sudo systemctl enable --now postgresql >/dev/null 2>&1 || true
sudo service postgresql start >/dev/null 2>&1 || true

ESCAPED_PASSWORD="$(escape_sql_literal "$DB_PASSWORD")"

echo "==> Creating/updating database role"
run_as_postgres <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE ROLE "$DB_USER" LOGIN PASSWORD '$ESCAPED_PASSWORD';
  ELSE
    ALTER ROLE "$DB_USER" WITH LOGIN PASSWORD '$ESCAPED_PASSWORD';
  END IF;
END
\$\$;
SQL

echo "==> Creating database if missing"
run_as_postgres <<SQL
SELECT 'CREATE DATABASE "$DB_NAME" OWNER "$DB_USER"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')
\gexec
SQL

echo "==> Importing schema from $SQL_FILE"
FILTERED_SQL_FILE="$(mktemp)"
trap 'rm -f "$FILTERED_SQL_FILE"' EXIT

# Prevent schema imports from failing if the SQL file contains CREATE DATABASE.
sed '/^[[:space:]]*CREATE[[:space:]]\+DATABASE[[:space:]]/Id' "$SQL_FILE" > "$FILTERED_SQL_FILE"

PGPASSWORD="$DB_PASSWORD" psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -v ON_ERROR_STOP=1 \
  -f "$FILTERED_SQL_FILE"

echo "==> Database setup complete"
echo "Connection string:"
echo "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // Database env variables
    DB_HOST: process.env.POSTGRES_HOST,
    DB_PORT: process.env.POSTGRES_PORT || 5432,
    DB_USER: process.env.POSTGRES_USER,
    DB_PASSWORD: process.env.POSTGRES_PASSWORD,
    DB_NAME: process.env.POSTGRES_DATABASE,

    // Clarify API env variables
    CLARIFAI_API_KEY: process.env.CLARIFAI_API_KEY,
    CLARIFAI_USER_ID: process.env.CLARIFAI_USER_ID,
    CLARIFAI_APP_ID: process.env.CLARIFAI_APP_ID,
    CLARIFAI_MODEL_ID: process.env.CLARIFAI_MODEL_ID,

    PORT: process.env.PORT
};
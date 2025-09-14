# How to run the backend after pulling repo:
1) Create the postgres database using the sql file in backend/database. Make sure you know the host, port, user, password and name of that database (which will be used as environment variables).
I used this video to set up a postgres database using a GCP compute instance: https://www.youtube.com/watch?v=JLdy_cJ1KRA
2) Create an empty .env file inside the backend directory. Fill in the environment variables using .env.example as a guide. 
3) Download and install node modules using the command (npm init)
4) Run the command (nodemon server.js) or (npm run start:dev) to start the server.

# Reminders to myself: 
- The IDE that I used was VS Code
- When you initially clone the repo, run `npm install` in the terminal to install all the required libraries.
- To start the server/api locally, run `node server.js` or `nodemon server.js`

# Some heroku commands:
- To deploy on heroku: git push heorku main (or any other branch name)
- To view the URL that the api/server is running on in heroku: heroku open
- To view logs on heroku: heroku logs --tail
- To access the postgres instance running on heroku: heroku pg:psql
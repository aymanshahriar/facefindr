# How to run the backend after pulling repo:
1) Create the postgres database using the sql file in backend/database. Make sure you know the host, port, user, password and name of that database (which will be used to create the connection string environment variable).
2) Create an empty .env file inside the backend directory. Fill in the environment variables using .env.example as a guide. 
3) Download and install node modules using the command (npm init)
4) Run the command (nodemon server.js) or (npm run start:dev) to start the server.

# Reminders to myself: 
- The IDE that I used was VS Code
- When you initially clone the repo, run `npm install` in the terminal to install all the required libraries.
- To start the server/api locally, run `node server.js` or `nodemon server.js`

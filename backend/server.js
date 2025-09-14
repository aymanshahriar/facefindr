const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT } = require('./config');

const express = require('express');
const cors = require('cors')
const knex = require('knex');             // guide to using knex: https://knexjs.org/guide/#browser

const { handleRegisterRequest } = require('./controllers/register');
const { handleSigninRequest } = require('./controllers/signin');
const { handleProfileGetRequest } = require('./controllers/profile');
const { handleImageCountIncrementRequest, handleClarifaiApiCall } = require('./controllers/image');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;             // Prevents the "Error: self signed certificate" when the backend/api and postgres database are deployed on heroku. For more info: https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/learn/lecture/19018214#content

const db = knex({
  client: 'pg',   // we installed pg with npm install pg
  connection: {
    // connectionString: process.env.DATABASE_URL,           // this was added after the postgres database was deployed on heroku
    // ssl: true                                             // this was added after the postgres database was deployed on heroku
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  }
}); 

const app = express();

app.use(express.json());                            // If this is not included, then we will not be able to read json sent in request body
app.use(cors());                                    // If this is not included, then the frontend will not be able to recieve responses from the api
                                                    // because the browsers will not allow it.
app.get('/test', (req, res) => { res.send("API is working") });  // Someone can use this endpoint to check whether they can access the api
app.post('/signin', (req, res) => { handleSigninRequest(req, res, db) });
app.post('/register', (req, res) => { handleRegisterRequest(req, res, db) });
app.get('/profile/:id', (req, res) => { handleProfileGetRequest(req, res, db) });
app.put('/image-count', (req, res) => { handleImageCountIncrementRequest(req, res, db) });
app.post('/image-url', (req, res) => { handleClarifaiApiCall(req, res) });

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});




/*
Notes on endpoints:

/signin
signin uses post instead of get because post allows us to attach the email and password in the request body instead of 
using query parameters (or path parameters), which is a security risk because then the email and password will be visible.

/profile/:id
This endpoint is not used by the face recognition frontend. Sometimes backend engineers create endpoints that 
 they don't immediately need, but they might need it in the future.

/image-count
After searching online, it seems that using a - is the best way to seperate words within an endpoint
This endpoint increments the image count of the user

/image-url
This endpoint makes an api call to clarifai api to see whether the given image has any faces. So this endpoint makes our server/api 
send a GET request to another api (the clarifai api)
*/
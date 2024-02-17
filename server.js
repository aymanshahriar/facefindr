const cors = require('cors')
const knex = require('knex');             // guide to using knex: https://knexjs.org/guide/#browser
const { handleRegisterRequest } = require('./controllers/register');
const { handleSigninRequest } = require('./controllers/signin');
const { handleProfileGetRequest } = require('./controllers/profile');
const { handleImageCountIncrementRequest, handleClarifaiApiCall } = require('./controllers/image');

const db = knex({
  client: 'pg',   // we installed pg with npm install pg
  connection: {
    connectionString: process.env.DATABASE_URL,           // this was added after the postgres database was deployed on heroku
    ssl: true                                             // this was added after the postgres database was deployed on heroku

    /* After deploying the postgres database on heroku, these are not required: 
    host: 'localhost'                   // Same as '127.0.0.1'
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'image_recognition_db'*/
  }
});

// db.select('*').from('users').then(data => {     // postgres.select.from returns a promise
//     console.log(data);
// });  

const express = require('express');
const app = express();

app.use(express.json());                            // If this is not included, then we will not be able to read json sent in request body
app.use(cors());                                    // If this is not included, then the frontend will not be able to recieve responses from the api
                                                    // because the browsers will not allow it.

app.get('/', (req, res) => { res.send("success") });  // Someone can use this endpoint to check whether they can access the api

// signin uses post instead of get because post allows us to attach the email and password in the request body instead of 
// using query parameters (or path parameters), which is a security risk because then the email and password will be visible.
app.post('/signin', (req, res) => { handleSigninRequest(req, res, db) });

app.post('/register', (req, res) => { handleRegisterRequest(req, res, db) });

/* This endpoint is not used by the face fecognition frontend. Sometimes backend engineers create endpoints that 
 they don't immediately need, but they might need it in the future. */
app.get('/profile/:id', (req, res) => { handleProfileGetRequest(req, res, db) });

// After searching online, it seems that using a - is the best way to seperate words within an endpoint
// This endpoint increments the image count of the user
app.put('/image-count', (req, res) => { handleImageCountIncrementRequest(req, res, db) });
// This endpoint makes an api call to clarifai api to see whether the given image has any faces. So this endpoint makes our server/api send a GET request to another api (the clarifai api)
app.post('/image-url', (req, res) => { handleClarifaiApiCall(req, res) });

// If the PORT environment variable is not set in the computer, then use port 3000 by default
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});




/*

Plan out a list of endpoints and responses that the frontend needs from the api

/ --> GET = api is working
/signin --> POST = success/fail     (signin requires POST method because we don't want the pass username & password through the url)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/
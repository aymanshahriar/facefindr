const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // Database env variables
    DB_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING,

    // Clarify API env variables
    CLARIFAI_API_KEY: process.env.CLARIFAI_API_KEY,
    CLARIFAI_USER_ID: process.env.CLARIFAI_USER_ID,
    CLARIFAI_APP_ID: process.env.CLARIFAI_APP_ID,
    CLARIFAI_MODEL_ID: process.env.CLARIFAI_MODEL_ID,

    PORT: process.env.PORT
};
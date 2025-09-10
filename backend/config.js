const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // Database env variables
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,

    // Clarify API env variables
    CLARIFAI_API_KEY: process.env.CLARIFAI_API_KEY,
    CLARIFAI_USER_ID: process.env.CLARIFAI_USER_ID,
    CLARIFAI_APP_ID: process.env.CLARIFAI_APP_ID,
    CLARIFAI_MODEL_ID: process.env.CLARIFAI_MODEL_ID
};
// When dealing with environment variables in a create-react-app project, you should not 
// use the dotenv package. Instead, you should create a .env file (and make sure it is inside src)
// and make sure that the environment variables used by our code start with REACT_APP_ , otherwise 
// they will not be accessible in our code.

module.exports = {
    API_URL: process.env.REACT_APP_API_URL,
    API_PORT: process.env.REACT_APP_API_PORT
};

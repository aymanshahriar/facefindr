
const handleProfileGetRequest = (req, res, db) => {
    const id = req.params.id;
    
    db.select('*').from('users').where('id', id)                                    // Unless we call .then(), the sql command will not be executed!                       
        .then(data => {                                                             // The "data" variable contains a list of rows fetched from the users table whose id is 16   
            if (data.length > 0) res.json(data[0]);
            else res.status(400).json('unable to fetch id');
        })
        .catch(err => res.status(400).json('unable to fetch id'));                  // If any error occurs when trying to fetch the user with that specific id, respond with this generic error message.
                                                                                    //   Don't respond with a specific message like "there is no such user with id 16", that is a violation of the 
                                                                                    //   security principle where we don't give the client any information about our system.
};

// Thanks to ES6, we can also define the module.exports object as just {handleProfileGetRequest}, which will be the same thing as {handleProfileGetRequest: handleProfileGetRequest}
module.exports = {
    handleProfileGetRequest: handleProfileGetRequest
};
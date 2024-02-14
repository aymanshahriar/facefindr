const bcrypt = require('bcrypt-nodejs');  // guide to using bcrypt: https://www.npmjs.com/package/bcrypt-nodejs

const handleSigninRequest = (req, res, db) => {    
    const {email, password} = req.body;
    
    if (!email || !password) {                                           // This checks whether the email or password is empty
        res.status(400).json('incorrect form submission');
        return;
    }
    
    // First try checking if we have any password stored with this email in the login table by fetching the email from login
    db.select('email', 'hash').from('login').where('email', email)
    .then(data => {                                                         // The "data" variable contains a list of rows fetched from the login table whose email matches the email given in the request body
        if (data.length == 0) res.status(400).json('Failed to log in (1)');                 // The user cannot be found in the login table. In other words, there is no row in that login table that matches the request email ("user does not exist")
        else {
            const hash = data[0].hash;
            const passwordIsValid = bcrypt.compareSync(password, hash);

            if (passwordIsValid) {
                // Now fetch user's account from user table
                db.select('*').from('users').where('email', email)                      // Unless we call .then(), the sql command will not be executed!                       
                .then(user => {                                                         // The user variable should either be an empty array (if no user exists with the given email), or it should be a single user object encased in an array
                    if (user.length > 0) res.json(user[0]);
                    else res.status(400).json('Failed to log in (2)');                  // The user cannot be found in the users table. This error should be impossible to get. If an email exists in the login table, it should definitely exist in the user table
                })
                .catch(err => res.status(400).json('Failed to log in (3)'));            // There is an error when querying the database to fetch the user details from the user table
            }
            else res.status(400).json('Failed to log in (4)')                           // The password given in the request does not match the password stored in the login table ("invalid password")
        
        }
    })
    .catch(err => res.status(400).json('Failed to log in (5)'));                            // There is an error when querying the database to fetch the user credentials (email and hash) from the login table

};

// Thanks to ES6, we can also define the module.exports object as just {handleSigninRequest}, which will be the same thing as {handleSigninRequest: handleSigninRequest}
module.exports = {
    handleSigninRequest: handleSigninRequest    
};
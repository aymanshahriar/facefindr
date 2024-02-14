const bcrypt = require('bcrypt-nodejs');  // guide to using bcrypt: https://www.npmjs.com/package/bcrypt-nodejs

/* When registering, we want to make sure that the correct data is either inserted in both user and login tables, or 
   they are inserted in neither tables. We don't want a scenario where data is added to one table but not the other. 
   Transactions allow us to achieve this. */
const handleRegisterRequest = (req, res, db) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {                                           // This checks whether the name, email or password is empty
        res.status(400).json('incorrect form submission');
        return;
    }
    var hash = bcrypt.hashSync(password);
    return db.transaction(trx => {
        db('login')                                                             // Unless we call .then(), the sql command will not be executed!
        .insert({email: email, hash: hash})
        .transacting(trx)                                                       // This line is requred when using transactions
        .then( () => {
            return db('users')                                                  // The return keyword need to be here because otherwise, for some reason, if an error occurs when attempting to put the entry into the database, the error will not be caught by the catch block of db.transaction(function(trx)
            .returning('*')                                                     // What returning does: after inserting the new user, return this user in the .then() below 
            .insert({name: name, email: email, joined: new Date()})             // Unless we call .then(), the sql command will not be executed!              
            .transacting(trx)                                                   // This line is requred when using transactions
            .then(user => res.json(user[0]))                                    // In the response to this endpoint request, return the user that was created. The user object is encased inside an array, hence user[0]

        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('unable to register'));                  // If any error occurs when trying to insert to the two tables, then neither table will be inserted into.
                                                               // Don't respond with a specific message like "charlie@gmail.com already exists", that is a violation of the 
                                                               //   security principle where we don't give the client any information about our system.
                                              
};

// Thanks to ES6, we can also define the module.exports object as just {handleRegisterRequest}, which will be the same thing as {handleRegisterRequest: handleRegisterRequest}

module.exports = {
    handleRegisterRequest: handleRegisterRequest
};
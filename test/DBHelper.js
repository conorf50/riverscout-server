/*
This file interfaces with the MongoDB instance through Mongoose

DB DETAILS on db 'riverscout'
db.createUser({
    user: 'riverscout',
    pwd: 'riverscout',
    roles: [{ role: 'readWrite', db:'riverscout'}]
})

*/

var mongoose = require('mongoose');
// import all of the dependencies (schemas)
var country = require('../schemas/countrySchema')

// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var DBHelper = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
DBHelper.insert = function(countryName, code) {
    console.log(`Creating or updating country: '${countryName}' with code ${code}`);
    
    return country.countrySchema.insertMany({ 
        countryName: "Ireland",                 
        code: "IE", 
        countryID: mongoose.Types.ObjectId 
    }, function(err) {
        return err
    });
}



module.exports = DBHelper;



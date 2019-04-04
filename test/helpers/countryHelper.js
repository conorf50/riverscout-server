/*
    Based on similar DAO functions
*/

var mongoose = require('mongoose');
// import all of the dependencies (schemas)
var country = require('../../schemas/countrySchema')
// this is a JSON file containing test data to insert into the database.
var data = require("../files/countries.json")

// enable Mongoose's debug mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var countryHelper = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
countryHelper.populate = function() {
    console.log("inserting groups");
    
    return country.countrySchema.insertMany(data, 
        function(err) {
        return err
    });
}



module.exports = countryHelper;




// created with help from here:
//https://stackoverflow.com/questions/50546533/unit-test-node-js-mongoose-mocha-chai-sinon
var mongoose = require('mongoose');
var CountryDAO = require('../lib/countryDAO')
mongoose.set('debug', true);

/*
Test db details.

db.createUser({
    user: 'npm',
    pwd: 'unittesting',
    roles: [{ role: 'readWrite', db:'npm_test_db'}]
})
*/


before (function () {
    console.log("This is a setup hook!")
    mongoose.connect('mongodb://npm:unittesting@10.10.1.10/npm_test_db', { useNewUrlParser: true }); // set up the connection with the above IP address ,user and password  
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    var db = mongoose.connection;
    // insert some sample data into the database

    
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    return CountryDAO.createOrUpdateCountry("Ireland", "IE")

    // CountrySchema.insertOne([{
    //     countryName: "Ireland ",                 // name to display on front end. Eg: "Ireland" , "United Kingdom" etc...
    //     code: "IE",  // eg: 'IE', 'UK', 'DE' etc.....
    //     countryID: new mongoose.Types.ObjectId
    // }]);
});

after(function () {
    console.log("Tearing down test suite")
})




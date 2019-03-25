
// created with help from here:
//https://stackoverflow.com/questions/50546533/unit-test-node-js-mongoose-mocha-chai-sinon
var mongoose = require('mongoose');
var CountrySchema = require('../schemas/countrySchema')
mongoose.set('debug', true);



before(function(){
console.log("This is a setup hook!")
mongoose.connect('mongodb://riverscout:riverscout@10.10.1.10/riverscout',{ useNewUrlParser: true }); // set up the connection with the above IP address ,user and password  
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
})

after(function(){
    console.log("Tearing down test suite")
})




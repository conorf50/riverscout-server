
// created with help from here:
//https://stackoverflow.com/questions/50546533/unit-test-node-js-mongoose-mocha-chai-sinon
var mongoose = require('mongoose');
var countryHelper = require('./countryHelper')
var groupHelper = require('./groupHelper')
mongoose.set('debug', true);

var country = require('../schemas/countrySchema')


/*
Test db details.

db.createUser({
    user: 'npm',
    pwd: 'unittesting',
    roles: [{ role: 'readWrite', db:'npm_test_db'}]
})
*/


before(async function () {
    console.log("This is a setup hook!")

    // insert some sample data into the database
    //countryHelper.populate()
    await country.countrySchema.insertMany([{ 
        countryName: "Ireland",                 
        code: "IE", 
        countryID: mongoose.Types.ObjectId 
    }], function(err) {
        return err
    });
    groupHelper.populate()
});

after(function () {
    console.log("Tearing down test suite")
})




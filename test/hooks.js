
// created with help from here:
//https://stackoverflow.com/questions/50546533/unit-test-node-js-mongoose-mocha-chai-sinon
const mongoose = require('mongoose');

// require the helper files
const countryHelper = require('./helpers/countryHelper');
const groupHelper = require('./helpers/groupHelper');

// enable Mongoose debugging
mongoose.set('debug', true);


// require some of our schemas
const country = require('../schemas/countrySchema');
const deviceGroups = require('../schemas/deviceGroups');


// this will run before the tests.
before(async function () {
    console.log("Clearing existing data and starting tests.")
    
    // cleaner than a promise. Needs 'await' because it's a background operation
    await country.countrySchema.deleteMany({}, function(err) {
        return err
    });
    await deviceGroups.deviceGroupSchema.deleteMany({}, function(err) {
        return err
    });

    // insert some sample data into the database
    countryHelper.populate()
    groupHelper.populate()
});

after(async function () {
    // clear the database on test exit
    console.log("Tearing down test suite")
    await country.countrySchema.deleteMany({}, function(err) {
        return err
    });
    await deviceGroups.deviceGroupSchema.deleteMany({}, function(err) {
        return err
    });

    console.log("Clearing data")

})




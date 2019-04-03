
// created with help from here:
//https://stackoverflow.com/questions/50546533/unit-test-node-js-mongoose-mocha-chai-sinon
const mongoose = require('mongoose');
const countryHelper = require('./countryHelper')
const groupHelper = require('./groupHelper')
mongoose.set('debug', true);

const country = require('../schemas/countrySchema')
const deviceGroups = require('../schemas/deviceGroups')
const sigfoxReadings = require('../schemas/sigfoxDataSchema')
//const country = require('../schemas/countrySchema')


before(async function () {
    console.log("Clearing existing data and starting tests.")
    
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
    // await sigfoxReadings.sigfox_device.deleteMany({}, function(err) {
    //     return err
    // });
    console.log("Clearing data")

})




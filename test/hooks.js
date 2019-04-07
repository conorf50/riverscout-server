
// created with help from here:
//https://stackoverflow.com/questions/50546533/unit-test-node-js-mongoose-mocha-chai-sinon
const mongoose = require('mongoose');

// require the helper files
const countryHelper = require('./helpers/countryHelper');
const groupHelper = require('./helpers/groupHelper');

// enable Mongoose debugging
mongoose.set('debug', true);

// this will run before the tests.
before(async function () {
    console.log("Clearing existing data and starting tests.")
    // start with a clean slate
    await countryHelper.purge()
    await groupHelper.purge()
    // insert some sample data into the database
    await countryHelper.populate()
    await groupHelper.populate()
});

after(async function () {
    // clear the database on test exit
    // console.log("Tearing down test suite")
    await countryHelper.purge()
    await groupHelper.purge()
})




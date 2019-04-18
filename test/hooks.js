
// created with help from here:
//https://stackoverflow.com/questions/50546533/unit-test-node-js-mongoose-mocha-chai-sinon
// Most of this file is from the above source
const mongoose = require('mongoose');

// require the helper files - makes the code cleaner
const countryHelper = require('./helpers/countryHelper'); // own work
const groupHelper = require('./helpers/groupHelper');  // own work
const sigfoxDeviceHelper = require('./helpers/sigfoxReadingHelper');  // own work


// enable Mongoose debugging (from Mozilla tutorial)
mongoose.set('debug', true);

// this will run before the tests.
before(async function () { 
    // use async await to make things predictable
    console.log("Clearing existing data and starting tests.")
    // start with a clean slate by clearing any existing data in the test
    await countryHelper.purge();
    await groupHelper.purge();
    await sigfoxDeviceHelper.purge();
    // insert some sample data into the database (see the JSON files in the 'files' directory)
    await countryHelper.populate();
    await groupHelper.populate();
});

// this will run before each test
beforeEach(async function(){
    // some tests were causing data consistency problems so we need to clear the database between tests
    await groupHelper.purge();
    await countryHelper.purge();
    // and repopulate it again
    await countryHelper.populate();
    await groupHelper.populate();
})

// upon test completion/failure - run this
after(async function () {
    // clear the database on test exit
    console.log("Tearing down test suite and purging database")
    await countryHelper.purge();
    await groupHelper.purge();
    await sigfoxDeviceHelper.purge();
})




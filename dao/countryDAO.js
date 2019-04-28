/*
This file interfaces with the MongoDB instance through Mongoose
and handles operations for countries



*/

var mongoose = require('mongoose');
// import all of the dependencies (schemas)
var CountrySchema = require('../schemas/countrySchema')
// require Bluebird instead of native Prommises
var Promise = require('bluebird');
// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var countryDAO = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
countryDAO.createOrUpdateCountry = function (countryName, code) {
    console.log(`Creating or updating country: '${countryName}' with code ${code}`);

    // attempt to find the group first
    return CountrySchema.countrySchema.findOneAndUpdate(
        // search based on this criteria.
        {
            countryName: countryName // name must be unique
        },
        // if the above returns a document, update that document, otherwise insert a new one
        {
            countryName: countryName,
            code: code
        },
        {
            upsert: true,
            new: true // will create a new country if none exists
        }) // should update an existing document otherwise it will insert a new one
        .then(function (x) {
            //console.log("Response from DB" + x)
            return (x)
        })
        .catch(function (err) {
            return (err)
        });
}



countryDAO.getAllCountries = function () {
    return CountrySchema.countrySchema.find({})
        .select('_id countryName code') // 'project' these fields only
        .then(function (z) {
            return z
        })
        .catch(err => {
            return (err.message)
        })
}


countryDAO.deleteCountry = function (countryID) {
    return CountrySchema.countrySchema.deleteOne({
        _id: countryID
    })
        .then(function (z) {
            return z
        })
        .catch(function (err) {
            return (
                err.message
            )
        })
}



module.exports = countryDAO;



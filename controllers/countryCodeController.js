'use strict'
var countryDAO = require('../dao/countryDAO');
//var Promise = require('bluebird');

//console.log(require('../lib/groupDAO'))

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addOrUpdateCountry(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let countryName = input.undefined.value.countryName
    let code = input.undefined.value.code

    countryDAO.createOrUpdateCountry(countryName, code)
    .then(function(x) {
      //res.json(x)  // just respond with this 
      res.json({
        "message" : "Created new / updated existing country",
        "countryName": x.countryName,
        "countryCode" : x.code,
        "databaseID" : x._id
      })
    })
    .catch(function(err){
      res.json(err)
    })

    // these are template strings
    // see here: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    //res.json(`Country: '${countryName}' created with code ${code} and ID ${countryID}`);
    //res.json("Created")
  }




  function getAllCountries(req, res) {
    // fetch the data using a call to the DAO and then handle the response using a Promise
    // see the following question for this solution: https://stackoverflow.com/questions/41199718/return-promises-instead-of-res-jsondata-in-node-js 
    countryDAO.getAllCountries()
    .then(function(x) {
      //console.log("Database Response  : " + x)
      //res.set('Content-Type', 'application/json');
      res.send(x)
    })
    .catch(function(err) {
      //Promise.reject(err);
      res.json(err)
    });
    // this sends back a JSON response which is a single string
  }
  

  function deleteCountry(req, res) {
    var input = req.swagger.params
    console.log(input)
    var countryID = input.countryID.value
    countryDAO.deleteCountry(countryID)
    .then(function(y){
      res.send(y); // res.json not working?
    })
    .catch(function(err){
      res.json(err)
    })
  }

  module.exports = {
    addOrUpdateCountry: addOrUpdateCountry,
    getAllCountries: getAllCountries,
    deleteCountry: deleteCountry
    };
  
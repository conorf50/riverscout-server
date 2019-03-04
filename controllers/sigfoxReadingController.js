'use strict'
var sigfoxDAO = require('../lib/sigfoxReadingDAO');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addSigfoxReading(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var input = req.swagger.params
    // console.log(input)
    // console.log(input.undefined.value.timestamp)

  
     var device = input.undefined.value.device
     var data = input.undefined.value.data
     var tsString = input.undefined.value.timestamp
     var tsInt = parseInt(tsString, 10) // specify a base of 10 as the second arg
  
     var momentTs  = new moment.unix(tsInt); // important since we are recieving UTC unix timstamps from Sigfox
     console.log("integer timestamp = " + tsInt)
     console.log("converted moment = " + momentTs)
    // // save the data
    sigfoxDAO.saveDeviceData(device, momentTs, data)
    .then(function(x){
      res.json(x);
    })
    .catch(function(err){
      res.json(err)
    })
    
    // this sends back a JSON response which is a single string
    // res.json("Data added to database");
  }



  function getSigfoxReadings(req, res){
    res.json("Dummy Controller")
  }
  
  module.exports = {
      addSigfoxReading: addSigfoxReading,
      getSigfoxReadings: getSigfoxReadings
    };
  
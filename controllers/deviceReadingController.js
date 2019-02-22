'use strict'
var DAO = require('../lib/dao');
//var Promise = require('bluebird');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addSensorReading(req, res) {
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
    DAO.saveDeviceData(device, momentTs, data)
    .then(function(x){
      res.json(x);
    })
    // this sends back a JSON response which is a single string
    // res.json("Data added to database");
  }
  
  module.exports = {
    // export the above function as 'addData' so we can use it in other modules
      addSensorReading: addSensorReading
    };
  
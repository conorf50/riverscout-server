'use strict'
var DeviceTypeDAO = require('../lib/deviceTypeDAO');
//var Promise = require('bluebird');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addOrUpdateDeviceType(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var input = req.swagger.params
    console.log(input)
    // console.log(input.undefined.value.timestamp)

  
    var deviceTypeName = input.undefined.value.deviceTypeName
    var deviceTypeDescription = input.undefined.value.deviceTypeDescription
    //var deviceType = input.undefined.value.deviceType
    console.log(`Creating new device type ${deviceTypeName} with desctiption ${deviceTypeDescription}`)
    // // save the data
    DeviceTypeDAO.createOrUpdateDeviceType(deviceTypeName, deviceTypeDescription)
    .then(function(x){
      res.json(x);
    })
    // this sends back a JSON response which is a single string
    //res.json("Data added to database");
  }
  
  module.exports = {
    // export the above function as 'addData' so we can use it in other modules
      addOrUpdateDeviceType: addOrUpdateDeviceType
    };
  
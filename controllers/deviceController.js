'use strict'
var deviceDAO = require('../lib/deviceDAO');
//var Promise = require('bluebird');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addNewDevice(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var input = req.swagger.params.undefined.value
    console.log("displayName" + input.displayName)
    // console.log(input.undefined.value.timestamp)
    deviceDAO.saveDeviceData(input)
    res.json("Data added to database");
  }
  
  module.exports = {
      addNewDevice: addNewDevice
    };
  
'use strict'
var deviceDAO = require('../lib/deviceDAO');
//var Promise = require('bluebird');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addNewDevice(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var input = req.swagger.params.undefined.value
    //console.log("displayName" + input.displayName)
    // console.log(input.undefined.value.timestamp)
    deviceDAO.saveDeviceData(input)
    .then(function(x){
      res.json(x);

    })
  }
  


  function getDeviceInfo(req, res, next) {

    var deviceID = req.swagger.params.deviceID.value
    
    // fetch the data using a call to the DAO and then handle the response using a Promise
    // see the following question for this solution: https://stackoverflow.com/questions/41199718/return-promises-instead-of-res-jsondata-in-node-js 
    deviceDAO.getDeviceData(deviceID)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      Promise.reject(err);
      res.json(err)
    });
    // this sends back a JSON response which is a single string
  }
  
  
  module.exports = {
      addNewDevice: addNewDevice,
      getDeviceInfo: getDeviceInfo
    };
  
'use strict'


/*
  Author: Conor Farrell (+ others where noted)
  For an overview of the structure of this file, refer to controllers/countryController.js
  as the controllers all work in the same basic fashion.
*/


var DeviceTypeDAO = require('../dao/deviceTypeDAO');

function addOrUpdateDeviceType(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var input = req.swagger.params
    console.log(input)
  
    var deviceTypeName = input.undefined.value.deviceTypeName
    var deviceTypeDescription = input.undefined.value.deviceTypeDescription
    var deviceType = input.undefined.value.deviceType
    console.log(`Creating new device type ${deviceTypeName} with description ${deviceTypeDescription} of type ${deviceType}`)
    // save the data
    DeviceTypeDAO.createOrUpdateDeviceType(deviceTypeName, deviceTypeDescription,deviceType)
    .then(function(x){
      res.json(x);
    })
    .catch(function(err) {
      res.json(err)
    })
  }
  

  function getAllDeviceTypes(req, res) {
    // fetch the data
    DeviceTypeDAO.getAllDeviceTypes()
    .then(function(x){
      res.send(x);
    })
    .catch(function(err) {
      res.json(err)
    })
  }


  function deleteDeviceType(req, res) {
    var input = req.swagger.params
    console.log(input)
    var deviceTypeID = input.deviceTypeID.value
    DeviceTypeDAO.deleteDeviceType(deviceTypeID)
    .then(function(x){
      res.send(x); // res.json not working?
    })
    .catch(function(err){
      res.json(err)
    })
  }



  module.exports = {
    // export the above functions so we can use them in other modules
      addOrUpdateDeviceType: addOrUpdateDeviceType,
      getAllDeviceTypes: getAllDeviceTypes,
      deleteDeviceType: deleteDeviceType
    };
  
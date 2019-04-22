'use strict'


/*
  Author: Conor Farrell (+ others where noted)
  For an overview of the structure of this file, refer to controllers/countryController.js
  as the controllers all work in the same basic fashion.
*/



var groupDAO = require('../dao/deviceGroupDAO');
// import the device DAO so we can find devices that have a group ID
var deviceDAO = require("../dao/deviceDAO")

function addDeviceGroup(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let groupName = input.undefined.value.groupName
    let groupLatitude = input.undefined.value.groupLat
    let groupLongitude = input.undefined.value.groupLong
    let countryCode = input.undefined.value.countryCode

    groupDAO.createDeviceGroup(groupName, groupLatitude, groupLongitude, countryCode)
    .then(function(x) {
      res.json(x)
    })
    .catch(err =>{
      res.json(err) // catch and return the error 'err' to the user
    })   
  }
  

  function getDeviceGroups(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let countryCode = input.countryCode.value
    console.log(`Country Code ${countryCode}`)

    groupDAO.findDeviceGroupByCode(countryCode)
    .then(x => {
      res.set('Content-Type', 'application/json');
      res.send(x)
    })
    .catch(err =>{ 
      res.json(err) // catch and return the error 'err' to the user
    })
  }

  function deleteDeviceGroup(req, res, next) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let deviceGroupID = input.deviceGroupID.value
    console.log(`Deleting device group  '${deviceGroupID}'`)

    groupDAO.deleteDeviceGroup(deviceGroupID)
    .then(x => {
      res.set('Content-Type', 'application/json');
      res.send(x)
    })
    .catch(err =>{ 
      res.json(err) // catch and return the error 'err' to the user
    })
  }


  function findGroupByName(req, res, next) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let groupName = input.groupName.value


    groupDAO.findGroupByName(groupName)
    .then(x => {
      res.set('Content-Type', 'application/json');
      res.send(x)
    })
    .catch(err =>{ 
      res.json(err) // catch and return the error 'err' to the user
    })
  }

  function getDevicesInGroup(req, res, next) {
    let input = req.swagger.params

    let groupID = input.groupID.value

    deviceDAO.findDevicesInGroup(groupID)
    .then(x => {
      res.send(x)
    })
    .catch(err =>{ 
      res.json(err) // catch and return the error 'err' to the user
    })
  }
  module.exports = {
    addDeviceGroup: addDeviceGroup,
    getDeviceGroups: getDeviceGroups,
    deleteDeviceGroup: deleteDeviceGroup,
    getDevicesInGroup: getDevicesInGroup,
    findGroupByName: findGroupByName
    };
  
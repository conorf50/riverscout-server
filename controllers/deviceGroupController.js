'use strict'
var groupDAO = require('../dao/deviceGroupDAO');
//var Promise = require('bluebird');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
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
    // these are template strings
    // see here: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    //res.json(`Group: '${groupName}' created with lat ${groupLatitude} and long ${groupLongitude}`);
    
  }
  

  function getDeviceGroups(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let countryCode = input.countryCode.value
    console.log(`Country Code ${countryCode}`)

    groupDAO.findDeviceGroups(countryCode)
    .then(x => {
      res.set('Content-Type', 'application/json');
      res.send(x)
    })
    .catch(err =>{ 
      res.json(err) // catch and return the error 'err' to the user
    })
    // these are template strings
    // see here: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    //res.json(`Found all groups for country code: `);

  }

  function deleteDeviceGroup(req, res, next) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let groupName = input.groupName.value
    console.log(`Deleting device group  '${groupName}'`)

    groupDAO.deleteDeviceGroup(groupName)
    .then(x => {
      res.set('Content-Type', 'application/json');
      res.send(x)
    })
    .catch(err =>{ 
      res.json(err) // catch and return the error 'err' to the user
    })
  }


  function findGroupByName(req, res, next) {
    res.json("Dummy Controller!")
    // this sends back a JSON response which is a single string
  }

  function getDevicesInGroup(req, res, next) {
    res.json("Dummy Controller!")
    // this sends back a JSON response which is a single string
  }
  module.exports = {
    addDeviceGroup: addDeviceGroup,
    getDeviceGroups: getDeviceGroups,
    deleteDeviceGroup: deleteDeviceGroup,
    getDevicesInGroup: getDevicesInGroup,
    findGroupByName: findGroupByName
    };
  
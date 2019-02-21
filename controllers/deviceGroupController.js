'use strict'
var groupDAO = require('../lib/groupDAO');
//var Promise = require('bluebird');

console.log(require('../lib/groupDAO'))

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addDeviceGroup(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let groupName = input.undefined.value.groupName
    let groupLatitude = input.undefined.value.groupLat
    let groupLongitude = input.undefined.value.groupLong

    groupDAO.createDeviceGroup(groupName, groupLatitude, groupLongitude)
    .then(function(x) {
      res.json(x)
    })
    // these are template strings
    // see here: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    //res.json(`Group: '${groupName}' created with lat ${groupLatitude} and long ${groupLongitude}`);
    
  }
  

  function getDeviceGroups(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    
    let countryCode = input.countryCode.value
    groupDAO.findDeviceGroups(countryCode)
    .then(result => {
      res.send(result)
    })
    // these are template strings
    // see here: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    //res.json(`Found all groups for country code: `);

  }


  module.exports = {
    addDeviceGroup: addDeviceGroup,
    getDeviceGroups: getDeviceGroups
    };
  
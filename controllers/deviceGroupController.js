'use strict'
var DAO = require('../lib/dao');
//var Promise = require('bluebird');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addDeviceGroup(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var input = req.swagger.params
    var groupName = input.undefined.value.groupName
    // console.log(input.undefined.value.timestamp)

    res.json("Group: '" + groupName + "' created");
  }
  
  module.exports = {
    addDeviceGroup: addDeviceGroup
    };
  
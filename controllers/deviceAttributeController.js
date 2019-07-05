'use strict'

/*
  Author: Conor Farrell (+ others where noted)
  For an overview of the structure of this file, refer to controllers/countryController.js
  as the controllers all work in the same basic fashion.

  This controller handles device 'attributes' like its information.


*/

//'import' the DAO functions
var deviceDAO = require('../dao/deviceDAO');


function addUpdateDevice(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  // 'input' contains all the fields for a new device.
  var input = req.swagger.params.undefined.value // send the whole object to the DAO.
  deviceDAO.saveDeviceData(input)
    .then(function (x) {
      res.json(x);
    })
    .catch(function (err) {
      res.json(err)
    });
}



function getDeviceInfo(req, res, next) {
  var deviceID = req.swagger.params.deviceID.value

  // fetch the data using a call to the DAO and then return the result to the user
  deviceDAO.getDeviceData(deviceID)
    .then(function (data) {
      res.send(data)
    })
    .catch(function (err) {
      res.json(err)
    });
  // this sends back a JSON response which is a single string
}

function deleteDeviceInfo(req, res) {
  var deviceID = req.swagger.params.deviceID.value

  deviceDAO.deleteDeviceData(deviceID)
    .then(function (data) {
      res.send(data)
    })
    .catch(function (err) {
      res.json(err)
    });
}

// export our functions so that they can be referenced in different classes
module.exports = {
  addUpdateDevice: addUpdateDevice,
  getDeviceInfo: getDeviceInfo,
  deleteDeviceInfo: deleteDeviceInfo
};

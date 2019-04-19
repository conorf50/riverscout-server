'use strict'

/*
  Author: Conor Farrell (+ others where noted)
  This file takes in readings from the Sigfox backend and stores them in 
  the database.

*/

var sigfoxDAO = require('../dao/sigfoxReadingDAO');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
var util = require("util")


function addSigfoxReading(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var input = req.swagger.params
  // we can access fields in the input object be calling
  // input.undefined.<field name>
  var sigfoxID = input.undefined.value.sigfoxID
  var rawHexString = input.undefined.value.rawHexString
  var timestamp = input.undefined.value.timestamp

  // convert the string to a number
  var tsInt = parseInt(timestamp, 10) // specify a base of 10 as the second arg. Moment needs a number to convert from UNIX to JS date

  // create a new Date from the converted UNIX timestamp
  var momentTs = new moment.unix(tsInt).utc(); // important since we are recieving UTC unix timstamps from Sigfox
  //console.log("integer timestamp = " + tsInt)
  //console.log("converted moment = " + momentTs)
  // save the data
  console.log("Parsed SF Data" + util.inspect(parseSigfoxData(rawHexString)))
  sigfoxDAO.saveDeviceData(sigfoxID, momentTs, rawHexString)
    .then(function (x) {
      res.json(x);
    })
    .catch(function (err) {
      res.json(err)
    })
}



function getSigfoxReadings(req, res) {

  var input = req.swagger.params
  var deviceID = input.deviceID.value
  var timestampLt = input.timestampLt.value
  var timestampGt = input.timestampGt.value

  sigfoxDAO.getDeviceData(deviceID, timestampGt, timestampLt)
    .then(x => {
      res.send(x)
    })
    .catch(err => {
      res.send(err)
    })

}



function deleteSigfoxReading(req, res, next) {
  var input = req.swagger.params
  var readingID = input.readingID.value

  sigfoxDAO.deleteOneReading(readingID)
    .then(x => {
      res.json(x)
    })
    .catch(err => {
      res.json(err)
    })
}

// delete all readings for a device
function deleteAllSigfoxReadings(req, res, next) {
  //res.json("Dummy Controller!")
  var input = req.swagger.params
  var deviceID = input.deviceID.value

  sigfoxDAO.deleteAllReadings(readingID)
    .then(x => {
      res.json(x)
    })
    .catch(err => {
      res.json(err)
    })
}


// Based on code available here:
// https://dzone.com/articles/build-an-end-to-end-sigfox-gps-tracker-using-wia-a

function parseSigfoxData(rawHexString) {
  let latHex = rawHexString.slice(0, 8);
  console.log("LATHEX" + latHex)
  let longHex = rawHexString.slice(8);
  console.log("LONGHEX" + longHex)
  let result = {
    latitude: Buffer(latHex, 'hex').readFloatLE(0).toFixed(4),
    longitude: Buffer(longHex, 'hex').readInt8(0)
  };
  return result;
}


module.exports = {
  addSigfoxReading: addSigfoxReading,
  getSigfoxReadings: getSigfoxReadings,
  deleteSigfoxReading: deleteSigfoxReading,
  deleteAllSigfoxReadings: deleteAllSigfoxReadings
};

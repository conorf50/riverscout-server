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
  /*
   the hex string contains up to 16 characters and the float value is stored in the 
   first 8 characters. So we need to parse the first 8 characters and convert the value
   from hex to decimal
  */
  let tempValHex = rawHexString.slice(0, 8);
  console.log("TEMP-HEX" + tempValHex)
  let waterHtValHex = rawHexString.slice(8);
  console.log("LEVEL-HEX" + waterHtValHex)
  let result = {
    // toFixed = specify how many decimal places are wanted eg: 4 = .xxxx, 6 = .xxxxxx
    // as specified in the deviceAttribute schema, we only need up to 4 decimal places
    // see: https://nodejs.org/api/buffer.html
    // read a float out of the first string, specifying little endian as the encoding
    waterTemp: Buffer.from(tempValHex, 'hex').readFloatLE(0).toFixed(4),
    // the water level value comes in as an unsigned integer
    waterLevel: Buffer.from(waterHtValHex, 'hex').readUInt8(0)

    // better encoding scheme that gives a wider range of values
    // needs a code change on the device side to send the value as a 16 bit little endian int
    //waterLevel: Buffer.from(waterHtValHex, 'hex').readInt16LE(0)


  };
  return result;
}


module.exports = {
  addSigfoxReading: addSigfoxReading,
  getSigfoxReadings: getSigfoxReadings,
  deleteSigfoxReading: deleteSigfoxReading,
  deleteAllSigfoxReadings: deleteAllSigfoxReadings
};

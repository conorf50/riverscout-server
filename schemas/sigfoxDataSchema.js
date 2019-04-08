/*
The following code was taken from:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Defining_and_creating_models
and modified accordingly
*/


var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;


// subject to change
// This document contains the measurements for a gauge, so there will ba many of these for one device
const sigfoxDataSchema = new Schema({
  // The deviceUID references the _id field in the 'devceSchema' collection
  deviceUID : {type: mongoose.Types.ObjectId, ref: 'deviceModel', required : true}, // name of the model we want to reference
  rawHexData: String, // store the raw data for cases where data has been incorrectly mapped
  waterTemp: mongoose.Types.Decimal128,
  timestamp: Date,
  waterLevel: mongoose.Types.Decimal128
});


// Compile model from schema
var sigfoxSchema = mongoose.model('sigfox_device_measurement', sigfoxDataSchema);

// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required

module.exports = {
      sigfox_device_measurement: sigfoxSchema
    };

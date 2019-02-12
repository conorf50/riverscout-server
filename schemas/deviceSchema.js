/*
The following code was taken from:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Defining_and_creating_models
and modified accordingly
*/


var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;


// This collection contains info for a device like it's install data
// and maintainence schedules. There is one of these per device.
const DeviceSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId(), // use this as a unique ID for a gauge even if it has been replaced. This is referenced in 'sigfoxDataSchema.js"
    displayName: String,                 // name to display on front end. Eg: "Suir at Kilsheelan Bridge"
    gpsLat: mongoose.Types.Decimal128, // see http://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-34-decimal.html
    gpsLong: mongoose.Types.Decimal128, // and https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude/8674#8674 
    countryCode: String,  // uses web domain codes, eg IE, DE, ES, CN, etc.....
    sigfoxID: String,     // store the Sigfox ID of this device (we can update this if necessary)
    installDate: Date, // date the gauge was installed
    replacementDate: Date, // date to replace the gauge by
    EOLDate: String, // date the device was actually replaced

    reportingFreq: Number, // how often (in minutes) the device is expected to send up data
    downlinkEnabled: Boolean, // can the device recieve data
    groupID : {type: mongoose.Types.ObjectId, ref: 'groupModel', required : true}, // reference the 'groupModel' in 'deviceGroups.js'
    activeStatus: Boolean, // is the device currently active?
    deviceHistory: {     // array containing all the history associated with a device. Empty on creation, not specified through add device API
      timestamp: Date,
      notes: String,
    }
  });
  
// Compile model from schema
var DeviceModel = mongoose.model('deviceModel', DeviceSchema);

// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required

module.exports = {
      deviceSchema : DeviceModel
    };

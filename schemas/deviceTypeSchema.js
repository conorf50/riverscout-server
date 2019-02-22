/*
This schema is for managind 'device types' where a numeric ID is assigned to each device type
This will also hold a name and description for a device type
*/


var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;


// Model of a 'device type'

const DeviceTypeSchema = new Schema({
    // We are using MongoIDs as the unique key because they have a higher chance of
    // being unique. We also include some 
    // helpful info to make finding devices easier 
    deviceTypeName: String,  // eg: "River Sensor V1"
    deviceType: {
        type: String,
        //enum: ['River', 'Air'], // commented out because it didn't work
        default: 'River'
    },
    deviceTypeDescription: String  // List the characteristics of this device type
  });
  
// Compile model from schema
var DeviceTypeModel = mongoose.model('deviceTypeModel', DeviceTypeSchema);

// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required
module.exports = {
      deviceTypeSchema : DeviceTypeModel
    };

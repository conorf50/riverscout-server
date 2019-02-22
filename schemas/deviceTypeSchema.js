/*
This schema is for managind 'device types' where a numeric ID is assigned to each device type
This will also hold a name and description for a device type
*/


var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;


// Model of a 'device type'

const DeviceTypeSchema = new Schema({
    deviceTypeID: mongoose.Schema.Types.ObjectId, 
    deviceTypeName: String,  // eg: 'IE', 'UK', 'DE' etc.....
    deviceTypeDescription: String  
  });
  
// Compile model from schema
var DeviceTypeModel = mongoose.model('deviceTypeModel', DeviceTypeSchema);

// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required
module.exports = {
      deviceTypeSchema : DeviceTypeModel
    };

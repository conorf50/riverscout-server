
/*
The following code was taken from:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Defining_and_creating_models
and modified accordingly
*/


var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var RiverscoutTestSchema = new Schema({
  deviceID: String,
  timestamp: Date,
  data: String
});

// Compile model from schema
var RiverscoutModel = mongoose.model('RSTestModel', RiverscoutTestSchema);

// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required

module.exports = {
    // export the above schema as 'RiverscoutSchema' so we can use it in other modules
      RiverscoutSchema: RiverscoutModel
    };

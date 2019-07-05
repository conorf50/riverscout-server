/*
  This schema is for managing 'country' documents where we index the ID of each country
  This is not really needed as the only purpose it serves is to have a simple 'country code' 
  for the front end application. This is why there is no connection between this and the device info schema
*/

var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;


// Model of a 'country' with a name and a two character code.

const CountrySchema = new Schema({
  //_id: mongoose.Schema.Types.ObjectId(), // use this as a unique ID for a gauge even if it has been replaced. This is referenced in 'sigfoxDataSchema.js"
  countryName: String,                 // name to display on front end. Eg: "Ireland" , "United Kingdom" etc...
  code: String,  // eg: 'IE', 'UK', 'DE' etc.....
  countryID: mongoose.Schema.Types.ObjectId
});

// Compile model from schema
var CountryModel = mongoose.model('countryModel', CountrySchema);

// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required
module.exports = {
  countrySchema: CountryModel
};

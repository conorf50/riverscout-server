/*
This schema is for mamaging 'country' documents where we index the ID of each country
*/


var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;


// Model of a 'country'

const CountrySchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId(), // use this as a unique ID for a gauge even if it has been replaced. This is referenced in 'sigfoxDataSchema.js"
    countryName: String,                 // name to display on front end. Eg: "Ireland" , "United Kingdom" etc...
    code: String,  // eg: 'IE', 'UK', 'DE' etc.....
    countryID: Number // 
  });
  
// Compile model from schema
var CountryModel = mongoose.model('countryModel', CountrySchema);

// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required
module.exports = {
      countrySchema : CountryModel
    };

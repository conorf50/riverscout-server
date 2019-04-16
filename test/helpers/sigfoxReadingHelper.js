/*
    Based on similar DAO functions
*/

var mongoose = require('mongoose');
// import all of the dependencies (schemas)
var sigfoxSchema = require('../../schemas/sigfoxDataSchema')




// enable Mongoose's debug mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var sigfoxDeviceHelper = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
// countryHelper.populate = function() {
//     console.log("inserting countries");
    
//     return country.countrySchema.insertMany(data, 
//         function(err) {
//         return err
//     });
// }


sigfoxDeviceHelper.purge = function() {
    console.log("purging all device measurements");
    return sigfoxSchema.sigfox_device_measurement.deleteMany({},
        function(err) {
        return err
    });
}


module.exports = sigfoxDeviceHelper;



/*
This file interfaces with the MongoDB instance through Mongoose

DB DETAILS on db 'riverscout'
db.createUser({
    user: 'riverscout',
    pwd: 'riverscout',
    roles: [{ role: 'readWrite', db:'riverscout'}]
})

*/

var mongoose = require('mongoose');
var moment = require('moment')
// import all of the dependencies (schemas)
var sigfoxDataSchema = require('../schemas/sigfoxDataSchema')

// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var sigfoxDAO = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>

// sigfoxID, momentTs, rawHexString
sigfoxDAO.saveDeviceData = function (sigfoxID, momentTs, rawHexData, waterLevel, waterTemp) {
    return new sigfoxDataSchema.sigfox_device_measurement({
        deviceUID: sigfoxID, // todo fix this
        rawHexData: rawHexData,
        waterLevel: waterLevel,
        waterTemp: waterTemp,
        timestamp: momentTs
    })
        .save()
        .then(function (y) {
            return y
        })
        .catch(function (err) {
            return err
        })
}


sigfoxDAO.getDeviceData = function (deviceUID, timestampGt, timestampLt) {

    /*
     return measurements for the selected device that lie between 'timestampGt' and 'timestampLt' 
     and contain the deviceUID

    */
    return sigfoxDataSchema.sigfox_device_measurement.aggregate([{
        $match: {
            $and: [
                { "deviceUID": deviceUID },
                {
                    "timestamp": {
                        $gt: Date(timestampGt),
                        $lt: Date(timestampLt)
                    }
                }
            ]
        }
    }])




}


sigfoxDAO.deleteOneReading = function (readingID) {
    // delete one reading matching the ID specified
    return sigfoxDataSchema.sigfox_device_measurement.deleteOne({
        _id: readingID
    })
        .then(function (z) {
            return z
        })
        .catch(function (err) {
            return (
                err.message
            )
        })
}

sigfoxDAO.deleteAllReadings = function (deviceID) {

    return sigfoxDataSchema.sigfox_device_measurement.deleteMany({
        deviceUID: deviceID
    })
        .then(function (z) {
            return z
        })
        .catch(function (err) {
            return (
                err.message
            )
        })
}

module.exports = sigfoxDAO;
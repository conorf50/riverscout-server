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
// import all of the dependencies (schemas)
var DeviceSchema = require('../schemas/deviceSchema')
// require Bluebird instead of native Prommises
var Promise = require('bluebird');
// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var dao = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
dao.saveDeviceData = function(input) {
    let displayName = input.displayName
    let gpsLat = input.gpsLat
    let gpsLong = input.gpsLong
    let countryCode = input.countryCode
    let sigfoxID = input.sigfoxID

    let installDate = input.installDate
    let replacementDate = input.replacementDate
    let EOLDate = input.EOLDate

    let reportingFreq = input.reportingFreq
    let downlinkEnabled = input.downlinkEnabled
    let groupID = input.groupID
    let activeStatus = input.activeStatus
    let deviceHistory = input.deviceHistory
    let timestamp = input.timestamp
    console.log(`Saving data for device: '${sigfoxID}' with timestamp ${timestamp} in group ${groupID}`);

    return  DeviceSchema.deviceSchema.findOneAndUpdate(
        // search based on this criteria
        {
            sigfoxID: sigfoxID
        },
        // if the above returns a document, update that document, otherwise insert a new one
        {
                displayName: displayName,
                gpsLat : gpsLat,
                gpsLong : gpsLong,
                countryCode: countryCode,
                sigfoxID : sigfoxID,
                installDate: installDate,
                replacementDate: replacementDate,
                EOLDate: EOLDate,
                reportingFreq: reportingFreq,
                downlinkEnabled: downlinkEnabled,
                groupID: groupID,
                activeStatus: activeStatus,
                deviceHistory: deviceHistory
            },
       {upsert: true}) // should update an existing document     
    .then(function(data) {
        return Promise.resolve(data) ;
    })
    .catch(function(err){
        return Promise.reject(err)
    });

}


dao.getDeviceData = function(deviceID) {
    return DeviceSchema.deviceSchema.find({
                _id : deviceID
            })
    .then(function(data) {
        console.log(data)
        return Promise.resolve(data) ;
    });
}


module.exports = dao;
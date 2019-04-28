/*
This file interfaces with the MongoDB instance through Mongoose

This file handles devices

*/

var mongoose = require('mongoose');
// import all of the required dependencies (schemas)
var DeviceSchema = require('../schemas/deviceAttributeSchema')

// enable Mongoose's debug mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var deviceDAO = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
deviceDAO.saveDeviceData = function (input) {
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
    let groupIDS = input.groupIDS
    let activeStatus = input.activeStatus
    let deviceHistory = input.deviceHistory
    console.log(`Saving or updating data for device: '${sigfoxID}' in groups ${groupIDS}`);

    return DeviceSchema.deviceAttributeSchema.findOneAndUpdate(
        // search based on this criteria
        // in the future, also add a ID for NB-IoT/LoRa etc... 
        {
            sigfoxID: sigfoxID
        },
        // if the above returns a document, update that document, otherwise insert a new one
        {
            displayName: displayName,
            gpsLat: gpsLat,
            gpsLong: gpsLong,
            countryCode: countryCode,
            sigfoxID: sigfoxID,
            installDate: installDate,
            replacementDate: replacementDate,
            EOLDate: EOLDate,
            reportingFreq: reportingFreq,
            downlinkEnabled: downlinkEnabled,
            groupIDS: groupIDS,
            activeStatus: activeStatus,
            deviceHistory: deviceHistory
        },
        {
            upsert: true,
            new: true
        }) // should update an existing document     
        .then(function (x) {
            console.log("data" + x)
            return (x)
        })
        .catch(function (err) {
            return (err)
        });

}


deviceDAO.getDeviceData = function (deviceID) {
    return DeviceSchema.deviceAttributeSchema.find({
        _id: deviceID
    })
        .then(function (data) {
            console.log(data)
            return (data);
        })
        .catch(err => {
            res.json(err)
        });
}

deviceDAO.findDevicesInCountry = function (countryCode) {
    return DeviceSchema.deviceAttributeSchema.find({
        countryCode: countryCode
    })
        .then(function (data) {
            console.log(data)
            return (data);
        })
        .catch(err => {
            res.json(err)
        });
}

deviceDAO.deleteDeviceData = function (deviceID) {
    // delete all data stored for a device including it's measurements!
    return DeviceSchema.deviceAttributeSchema.deleteOne({
        _id: deviceID
    })
        // also delelte the measurements for this device
        // .then(function(x){

        // })
        .then(function (z) {
            return z
        })
        .catch(err => {
            return (
                err.message
            )
        })
}


deviceDAO.findDevicesInGroup = function (groupID) {

    return DeviceSchema.deviceAttributeSchema.aggregate([

        /* 
        Since the group IDs is a nested array, we need to 'unwind' all 
        documents containing the specified ID

        After the unwind process, there will be multiple copies of each gauge
        for each of the group IDs it has. We then search through this list
        and return all devices that have the specified group ID
        */

        { $unwind: "$groupIDS" },
        { $match: { "groupIDS": mongoose.Types.ObjectId(groupID) } }
    ]
    )

}

module.exports = deviceDAO;
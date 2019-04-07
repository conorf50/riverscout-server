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
var DeviceTypeSchema = require('../schemas/deviceTypeSchema')
// require Bluebird instead of native Prommises
var Promise = require('bluebird');
// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var deviceTypeDAO = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
deviceTypeDAO.createOrUpdateDeviceType = function(deviceTypeName, deviceTypeDescription, deviceType) {
    console.log(`Creating new device type ${deviceTypeName} with desctiption ${deviceTypeDescription} of type ${deviceType}`)
    
    // attempt to find the group first
    return  DeviceTypeSchema.deviceTypeSchema.findOneAndUpdate(
        // search based on this criteria
        {
            deviceTypeName : deviceTypeName,
            deviceTypeDescription : deviceTypeDescription
        },
        // if the above returns a document, update that document, otherwise insert a new one
        {
                deviceTypeName : deviceTypeName,
                deviceTypeDescription: deviceTypeDescription,
                deviceType: deviceType
            },
       {
        // should update an existing document otherwise it will insert a new one
           upsert: true,
           new: true
        })
    .then(function(x) {
        console.log("Response from DB" + x)
        return(x)
    })
    .catch(function(err){
        return (err.message)
    });
}

deviceTypeDAO.getAllDeviceTypes = function(){
    return DeviceTypeSchema.deviceTypeSchema.find({
    })
    .select('deviceType _id deviceTypeDescription deviceTypeName') // 'project' these fields only
    .then(function(z){
        return z
    })
    .catch(err => {
        return(err.message)
    })
}


deviceTypeDAO.deleteDeviceType = function(deviceTypeID){
    return DeviceTypeSchema.deviceTypeSchema.deleteOne({
        _id: deviceTypeID
    })
    .then(function(z){
        return z
    })
    .catch(err =>{
        return(
            err.message
        )
    })
}


module.exports = deviceTypeDAO;



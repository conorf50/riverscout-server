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
    //console.log(`Saving data for device: '${deviceID}' with timestamp ${timestamp}`);

    // return new Schemas.RiverscoutSchema({
    //             deviceID : deviceID,
    //             data : data,
    //             timestamp : timestamp
    //         })
    // .save()
    // .then(function(data) {
    //     return Promise.resolve(data) ;
    // });


    // // attempt to find the group first
    // return  DeviceSchema.deviceSchema.findOneAndUpdate(
    //     // search based on this criteria
    //     {
    //         sigfoxID : sigfoxID
    //     },
    //     // if the above returns a document, update that document, otherwise insert a new one
    //     {
    //         deviceID : deviceID,
    //         timstamp : timestamp,
    //         data : data
    //         },
    //    {upsert: true}) // should update an existing document     
    // .then(function(data) {
    //     return Promise.resolve(data) ;
    // })
    // .catch(function(err){
    //     return Promise.reject(err)
    // });


}


dao.getDeviceData = function(deviceID, timestampGt, timestampLt) {
    return Schemas.RiverscoutSchema.find({
                deviceID : deviceID,
                "timestamp":{
                    $gt: timestampGt,
                    $lt: timestampLt
                }
            })
    .then(function(data) {
        console.log(data)
        return Promise.resolve(data) ;
    });
}


module.exports = dao;
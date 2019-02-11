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
var GroupSchema = require('../schemas/deviceGroups')
// require Bluebird instead of native Prommises
var Promise = require('bluebird');
// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var groupDAO = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
groupDAO.createDeviceGroup = function(groupName, groupLatitude, groupLongitude) {
    console.log(`Creating group: '${groupName}' with lat ${groupLatitude} and long ${groupLongitude}`)
    return new GroupSchema.deviceGroupSchema({
                groupName : groupName,
                groupLat : groupLatitude,
                groupLong : groupLongitude
            })
    .save()
    .then(function(data) {
        return Promise.resolve(data) ;
    })
    .catch(function(err){
        return Promise.reject(err)
    });
}
module.exports = groupDAO;
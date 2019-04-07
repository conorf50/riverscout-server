'use strict'
var DAO = require('../dao/dao');
//var Promise = require('bluebird');

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function getDeviceData(req, res, next) {

  var deviceID = req.swagger.params.deviceID.value
  var timestampGt = new moment(req.swagger.params.timestampGt.value)
  var timestampLt = new moment(req.swagger.params.timestampLt.value)


    // res.json({
    //   message: 'There is no data'
    // });


  // fetch the data using a call to the DAO and then handle the response using a Promise
  // see the following question for this solution: https://stackoverflow.com/questions/41199718/return-promises-instead-of-res-jsondata-in-node-js 
  DAO.getDeviceData(deviceID, timestampGt, timestampLt)
  .then(function(data) {
    res.send(data)
  })
  .catch(function(err) {
    Promise.reject(err);
    res.json(err)
  });
  // this sends back a JSON response which is a single string
}





// module.exports.getDeviceData = function getDeviceData(req, res, next) {
//     res.send({
//       message: 'There is no data'
//     });
//   };


module.exports = {
  // export the above function as 'addData' so we can use it in other modules
    getDeviceData: getDeviceData
  };

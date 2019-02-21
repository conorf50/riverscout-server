'use strict'
var countryDAO = require('../lib/countryDAO');
//var Promise = require('bluebird');

//console.log(require('../lib/groupDAO'))

// date library that allows relative dates like .fromNow, subtract X days and more
var moment = require('moment');
function addNewCountry(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let countryName = input.undefined.value.countryName
    let code = input.undefined.value.code
    let countryID = input.undefined.value.countryID

    countryDAO.createOrUpdateCountry(countryName, code, countryID)
    .then(function(x) {
      res.json(x)  // just respond with this 
      // res.json({
      //   "message" : "Created new country",
      //   "countryName": x.countryName,
      //   "countryCode" : x.code,
      //   "countryID" : x.countryID
      // })
    })

    // these are template strings
    // see here: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    //res.json(`Country: '${countryName}' created with code ${code} and ID ${countryID}`);
    //res.json("Created")
  }
  

  module.exports = {
    addNewCountry: addNewCountry
    };
  
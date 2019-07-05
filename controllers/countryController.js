'use strict' // from Mozilla developer tutorial - causes errors to crash the program

/*
  Author : Conor Farrell (+ others where noted)

  This file is the controller that handles countries. The YAML file hooks into 
  the controllers defined here to provide functionality.

  The database operations are handled by a seperate file called 'countryDAO'
  located in the 'dao' directory. This allows the code to remain mostly unchanged
  in the event of migrating to a different database as the only parts that need to 
  be rewritten would be the DAO functions. It also makes the code cleaner and easier to
  modify by hiding the database operations behind a simple interface.

  All other controllers work in the same way.
*/



var countryDAO = require('../dao/countryDAO'); // refernce our DAO file

function addOrUpdateCountry(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let input = req.swagger.params
    let countryName = input.undefined.value.countryName
    let code = input.undefined.value.code

    countryDAO.createOrUpdateCountry(countryName, code)
    .then(function(x) {
      //make the response a little prettier
      res.json({
        "message" : "Created new / updated existing country",
        "countryName": x.countryName,
        "countryCode" : x.code,
        "databaseID" : x._id
      })
    })
    .catch(function(err){
      res.json(err)
    })
  }




  function getAllCountries(req, res) {
    // fetch the data using a call to the DAO and then return the response to the user via Express
    countryDAO.getAllCountries()
    .then(function(x) {
      res.send(x)
    })
    .catch(function(err) {
       res.json(err)
    });
  }
  

  function deleteCountry(req, res) {
    var input = req.swagger.params
    console.log(input)
    var countryID = input.countryID.value
    countryDAO.deleteCountry(countryID)
    .then(function(y){
      res.send(y); 
    })
    .catch(function(err){
      res.json(err)
    })
  }

  // define our function names to export. This is so we can access the 
  // functions defined here in other files
  module.exports = {
    addOrUpdateCountry: addOrUpdateCountry,
    getAllCountries: getAllCountries,
    deleteCountry: deleteCountry
    };
  
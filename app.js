'use strict';

/*
The code below is generated by the 'oas-generator' module and also contains code from here
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Defining_and_creating_models
*/

// START OF GENERATED CODE
var fs = require('fs'),
    http = require('http'),
    path = require('path');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
//Import the mongoose module
// Taken from Mozilla Dev link above
var mongoose = require('mongoose');
app.use(bodyParser.json({
  strict: false
}));
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;

// filename changed to 'admin-api-spec' for semantics
var spec = fs.readFileSync(path.join(__dirname, '/api/admin-api-spec.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
  controllers: path.join(__dirname, './controllers'),
  //loglevel: 'debug', // default is 'info', specify  'debug' to enable debugging
  loglevel: 'info', // default is 'info', specify  'debug' to enable debugging
  strict: false,
  router: true,
  validator: true
  //docs: false // uncomment this and add comma to above line to disable the inbuilt documentation
};

oasTools.configure(options_object);

oasTools.initialize(oasDoc, app, function() {
  http.createServer(app).listen(serverPort, function() {
    console.log("App running at http://localhost:" + serverPort);
    console.log("________________________________________________________________");
    if (options_object.docs !== false) {
      console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
      console.log("________________________________________________________________");
    }
  });
    //Set up default mongoose connection - taken from Mozilla tutorial
    //var mongoDB = 'mongodb://127.0.0.1/riverscout'; // localhost only for development
    
    
    //var mongoDB = 'mongodb://riverscout:riverscout@10.10.1.11/riverscout_db'; use other VM as a database


    mongoose.connect('mongodb://riverscout:riverscout@10.10.1.10/riverscout',{ useNewUrlParser: true }); // set up the connection with the above IP address ,user and password  
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    var db = mongoose.connection;
  
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});

app.get('/info', function(req, res) {
  res.send({
    info: "This API was generated using the oas-generator NPM module (https://github.com/isa-group/oas-generator)"
    //name: oasDoc.info.title
  });
});
module.exports = app; // do this so we can point our test suite at this app
/// END OF GENERATED CODE
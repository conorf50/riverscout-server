/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict';

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;
var util = require('util') // import for the util.inspect method

    describe('#POST / deviceGroups', function() { 
      it('should add a new group country code "IE"', function(done) { 
        request(app) .post('/api/addOrUpdateDeviceGroup')
        .send({
            "groupLat":64.2341,
            "groupLong": -7.9922,
            "groupName": "New Group",
            "countryCode": "IE"
        })
          .end(function(err, res) { 
           
            //console.log("RES = " + util.inspect(res.body))
            done(); 
          }); 
      });
    });

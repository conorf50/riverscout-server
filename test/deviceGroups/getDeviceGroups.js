/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict';

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

describe('Get All Device Groups for code "IE" ', function() {
    describe('#GET / deviceGroups', function() { 
      it('should get all device groups for the country IE', function(done) { 
        request(app) .get('/api/getAllDeviceGroups?countryCode=IE')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            console.log("RES = " + typeof(res))
            done(); 
          }); 
      });
    });
  });


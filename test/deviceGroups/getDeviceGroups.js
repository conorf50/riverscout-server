/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict';

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;
var util = require('util') // import for the util.inspect method


describe('Get All Device Groups for code "IE" ', function() {
    describe('#GET / deviceGroups', function() { 
      it('should get all device groups for the country code "IE"', function(done) { 
        request(app) .get('/api/getAllDeviceGroups?countryCode=IE')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            // check the names of each group
            expect(res.body[0].groupName).to.equal("Unit Test Group #1");
            expect(res.body[1].groupName).to.equal("Unit Test Group #4");
            expect(res.body[2].groupName).to.equal("Unit Test Group #5");

            //check if all the countrycodes match
            expect(res.body[0].countryCode).to.equal("IE");
            expect(res.body[1].countryCode).to.equal("IE");
            expect(res.body[2].countryCode).to.equal("IE");

            // check the locations of each of the groups
            expect(res.body[0].groupLat.$numberDecimal).to.equal("52.4542");
            expect(res.body[0].groupLong.$numberDecimal).to.equal("-7.3453");

            expect(res.body[1].groupLat.$numberDecimal).to.equal("53.9932");
            expect(res.body[1].groupLong.$numberDecimal).to.equal("-7.6453");

            expect(res.body[2].groupLat.$numberDecimal).to.equal("51.4541");
            expect(res.body[2].groupLong.$numberDecimal).to.equal("-6.9989");

            console.log("RES = " + util.inspect(res.body))
            done(); 
          }); 
      });
    });
  });


/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict'; // causes program to fail on syntax errors

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');
  
var expect = chai.expect;
describe('Get All Countries', function() {
    describe('#GET / getAllCountries', function() { 
      it('should get all countries', function(done) { 
        request(app) .get('/api/getAllCountries')
          .end(function(err, res) { 
            //console.log("Response" + JSON.stringify(res.text))
            expect(res.statusCode).to.equal(200); 
            
            //console.log(res.text.countryCode);
            done(); 
          }); 
      });
    });
  });


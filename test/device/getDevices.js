/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict';

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

describe('Second Test', function() {
    describe('#GET / devices', function() { 
      it('should get all devices for the country IE', function(done) { 
        request(app) .get('/deviceGroups&countryCode="IE"')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            done(); 
          }); 
      });
    });
  });


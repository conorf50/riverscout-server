/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict'; // causes program to fail on syntax errors

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');

var util = require("util")
var expect = chai.expect;
describe('Get All Countries', function () {
  describe('#GET / getAllCountries', function () {
    it('should get all countries', function (done) {
      request(app).get('/api/getAllCountries')
        .end(function (err, res) {
          console.log("Countries" + res.text);
          expect(res.statusCode).to.equal(200);

          //console.log(res.text.countryCode);
          done();
        });
    });
  });
});

describe('add a new country called "NewCountryLand"', function () {
  it('should update the first group', function (done) {
    request(app).post('/api/addOrUpdateCountry')
      .send({
        "countryName": "NewCountryLand",
        "code": "NC"
      })
      .end(function (err, res) {
        console.log("RES = " + util.inspect(res.body))
        // this should succeed because we have no group matching this name anymore
        expect(res.body.countryName).to.equal("NewCountryLand");
        expect(res.body.countryCode).to.equal("NC");

        done();
      });
  });
});
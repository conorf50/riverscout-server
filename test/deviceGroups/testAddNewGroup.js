/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict';

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;
var util = require('util') // import for the util.inspect method

describe('Adding new device groups', function () {
  it('should add a new group country code "IE"', function (done) {
    request(app).post('/api/addOrUpdateDeviceGroup')
      .send({
        "groupLat": 64.2341,
        "groupLong": -7.9922,
        "groupName": "New Group",
        "countryCode": "IE"
      })
      .end(function (err, res) {
        //console.log("RES = " + util.inspect(res.body))
        expect(res.body.groupName).to.equal("New Group");
        expect(res.body.countryCode).to.equal("IE");
        expect(res.body.groupLat.$numberDecimal).to.equal("64.2341");
        expect(res.body.groupLong.$numberDecimal).to.equal("-7.9922");
        done();
      });
  });


  it('should add a new group called "TEST GROUP"', function (done) {
    request(app).post('/api/addOrUpdateDeviceGroup')
      .send({
        "groupLat": 56.2341,
        "groupLong": -7.9322,
        "groupName": "TEST GROUP",
        "countryCode": "IE"
      })
      .end(function (err, res) {
        //console.log("RES = " + util.inspect(res.body))
        expect(res.body.groupName).to.equal("TEST GROUP");
        expect(res.body.countryCode).to.equal("IE");
        expect(res.body.groupLat.$numberDecimal).to.equal("56.2341");
        expect(res.body.groupLong.$numberDecimal).to.equal("-7.9322");
        done();
      });
  });


  it('should add a new group for country code "FR"', function (done) {
    request(app).post('/api/addOrUpdateDeviceGroup')
      .send({
        "groupLat": 24.2341,
        "groupLong": -2.9922,
        "groupName": "Another One",
        "countryCode": "FR"
      })
      .end(function (err, res) {
        //console.log("RES = " + util.inspect(res.body))
        expect(res.body.groupName).to.equal("Another One");
        expect(res.body.countryCode).to.equal("FR");
        expect(res.body.groupLat.$numberDecimal).to.equal("24.2341");
        expect(res.body.groupLong.$numberDecimal).to.equal("-2.9922");
        done();
      });
  });
});


describe('Updating the name for an existing device group', function () {
  it('should rename the first group to "Updated Group"', function (done) {
    request(app).post('/api/addOrUpdateDeviceGroup')
      .send({
        "groupLat": 64.2341,
        "groupLong": -7.9922,
        "groupName": "Updated Group",
        "countryCode": "IE"
      })
      .end(function (err, res) {
        //console.log("RES = " + util.inspect(res.body))
        expect(res.body.groupName).to.equal("Updated Group");
        expect(res.body.countryCode).to.equal("IE");
        expect(res.body.groupLat.$numberDecimal).to.equal("64.2341");
        expect(res.body.groupLong.$numberDecimal).to.equal("-7.9922");
        done();
      });
  });
});

describe('try to change another group name to "New Group"', function () {
  it('should update the first group', function (done) {
    request(app).post('/api/addOrUpdateDeviceGroup')
      .send({
        "groupLat": 24.2341,
        "groupLong": -2.9922,
        "groupName": "New Group",
        "countryCode": "FR"
      })
      .end(function (err, res) {
        console.log("RES = " + util.inspect(res.body))
        // this should succeed because we have no group matching this name anymore
        expect(res.body.groupName).to.equal("New Group");
        expect(res.body.countryCode).to.equal("FR");
        expect(res.body.groupLat.$numberDecimal).to.equal("24.2341");
        expect(res.body.groupLong.$numberDecimal).to.equal("-2.9922");
        done();
      });
  });
});

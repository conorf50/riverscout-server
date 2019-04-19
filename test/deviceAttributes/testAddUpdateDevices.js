/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict'; // causes program to fail on syntax errors

var app = require('../../app'),
    chai = require('chai'),
    request = require('supertest');

var util = require("util")
var expect = chai.expect;
// we will get this ID from the database by making a GET request and selecting the first country that comes back.  
let group1ID = "";
let group2ID = "";

// gauge IDs
let gauge1ID = "";
let gauge2ID = "";




/*
    These tests add a new device (gauge) and update it's details
    1: Poll device groups to get group IDs to add this new device to
    2: Create a new device with one group ID. Make note of the new device ID
    3: Poll for this device and check if the data is consistent with the other test
    4: Create another device with a different group ID
    5: Update the first device with the second group ID (add device 1 to another group)
    6: Add a history to a device and verify that it has been added.
*/





// Get all device groups and get two group IDs to use below
// We need to have groups set up already before we can add a device
describe('Get group IDs', function () {
    it('should get all device groups for the country code "IE" and extract the IDs', function (done) {
        request(app).get('/api/getAllDeviceGroups?countryCode=IE')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                // get the IDs of the gauges and store them
                group1ID = res.body[0]._id
                group2ID = res.body[1]._id
                console.log("Group 1 ID = " + group1ID)
                console.log("Group 2 ID = " + group2ID)
                done();
            });
    });
});


// add a new gauge
describe('add a new gauge called "TestGauge #1"', function () {
    it('should add a new gauge and verify its addition', function (done) {
        request(app).post('/api/addOrUpdateDevice')
            .send({
                displayName: "TestGauge #1",
                gpsLong: 56.4342,
                gpsLat: -7.5938,
                countryCode: "IE",
                sigfoxID: "ABC123",
                installDate: "2015-09-09T14:34:34Z",
                replacementDate: "2020-09-03T00:00:00Z",
                EOLDate: "2021-09-01T14:29:34Z",
                reportingFreq: "30",
                groupIDS: [
                    group1ID
                ],
                activeStatus: true,
                downlinkEnabled: true
            })
            .end(function (err, res) {
                console.log("Adding a new gauge = " + util.inspect(res.body))
                // this should succeed because we have no group matching this name anymore
                expect(res.body.displayName).to.equal("TestGauge #1");

                expect(res.body.gpsLong.$numberDecimal).to.equal('56.4342');
                expect(res.body.gpsLat.$numberDecimal).to.equal('-7.5938');

                expect(res.body.countryCode).to.equal("IE");

                expect(res.body.sigfoxID).to.equal("ABC123");
                expect(res.body.installDate).to.equal("2015-09-09T14:34:34.000Z"); // since Mongo appends the '.000' for milliseconds, we need to test for this also
                expect(res.body.replacementDate).to.equal("2020-09-03T00:00:00.000Z");
                expect(res.body.EOLDate).to.equal("2021-09-01T14:29:34Z"); // note no '.000' because there is a millisecond value already in the timestamp

                expect(res.body.reportingFreq).to.equal(30);

                expect(res.body.groupIDS[0]).to.equal(group1ID); // this is an array so we need to compare only the first element

                expect(res.body.activeStatus).to.equal(true);
                expect(res.body.downlinkEnabled).to.equal(true);

                // Make note of the ID
                gauge1ID = res.body._id
                done();
            });
    });
});

// get the new gauge's info
describe('Get info for gauge #1', function () {
    it('should get the same info as above', function (done) {
        request(app).get('/api/getInfoForDeviceID?deviceID=' + gauge1ID)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                // since this is an array, we need to access the first element
                expect(res.body[0].displayName).to.equal("TestGauge #1");

                expect(res.body[0].gpsLong.$numberDecimal).to.equal('56.4342');
                expect(res.body[0].gpsLat.$numberDecimal).to.equal('-7.5938');

                expect(res.body[0].countryCode).to.equal("IE");

                expect(res.body[0].sigfoxID).to.equal("ABC123");
                expect(res.body[0].installDate).to.equal("2015-09-09T14:34:34.000Z");
                expect(res.body[0].replacementDate).to.equal("2020-09-03T00:00:00.000Z");
                expect(res.body[0].EOLDate).to.equal("2021-09-01T14:29:34Z");

                expect(res.body[0].reportingFreq).to.equal(30);

                expect(res.body[0].groupIDS[0]).to.equal(group1ID);

                expect(res.body[0].activeStatus).to.equal(true);
                expect(res.body[0].downlinkEnabled).to.equal(true);
                done();
            });
    });
});

describe('add another gauge called "River Gauge #2"', function () {
    it('should add another new gauge and verify its addition', function (done) {
        request(app).post('/api/addOrUpdateDevice')
            .send({
                displayName: "River Gauge #2",
                gpsLong: 55.9942,
                gpsLat: -7.5700,
                countryCode: "IE",
                sigfoxID: "DEF456",
                installDate: "2016-08-08T13:31:44Z",
                replacementDate: "2019-02-02T00:00:00Z",
                EOLDate: "2019-09-01T14:29:34Z",
                reportingFreq: "60",
                groupIDS: [
                    group2ID
                ],
                activeStatus: true,
                downlinkEnabled: true
            })
            .end(function (err, res) {
                // console.log("Adding a new gauge = " + util.inspect(res.body))
                // this should succeed because we have no group matching this name anymore
                expect(res.body.displayName).to.equal("River Gauge #2");

                expect(res.body.gpsLong.$numberDecimal).to.equal('55.9942');
                expect(res.body.gpsLat.$numberDecimal).to.equal('-7.57'); // drop the trailing zeros

                expect(res.body.countryCode).to.equal("IE");

                expect(res.body.sigfoxID).to.equal("DEF456");
                expect(res.body.installDate).to.equal("2016-08-08T13:31:44.000Z");
                expect(res.body.replacementDate).to.equal("2019-02-02T00:00:00.000Z");
                expect(res.body.EOLDate).to.equal("2019-09-01T14:29:34Z");

                expect(res.body.reportingFreq).to.equal(60);

                expect(res.body.groupIDS[0]).to.equal(group2ID); // this is an array so we need to compare only the first element

                expect(res.body.activeStatus).to.equal(true);
                expect(res.body.downlinkEnabled).to.equal(true);

                // Make note of the ID
                gauge2ID = res.body._id
                done();
            });
    });
});


// get the new gauge's info
describe('Get info for gauge #2', function () {
    it('should get the same info as above', function (done) {
        request(app).get('/api/getInfoForDeviceID?deviceID=' + gauge2ID)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                // since this is an array, we need to access the first element
                expect(res.body[0].displayName).to.equal("River Gauge #2");

                expect(res.body[0].gpsLong.$numberDecimal).to.equal('55.9942');
                expect(res.body[0].gpsLat.$numberDecimal).to.equal('-7.57'); // drop the trailing zeros

                expect(res.body[0].countryCode).to.equal("IE");

                expect(res.body[0].sigfoxID).to.equal("DEF456");
                expect(res.body[0].installDate).to.equal("2016-08-08T13:31:44.000Z");
                expect(res.body[0].replacementDate).to.equal("2019-02-02T00:00:00.000Z");
                expect(res.body[0].EOLDate).to.equal("2019-09-01T14:29:34Z");

                expect(res.body[0].reportingFreq).to.equal(60);

                expect(res.body[0].groupIDS[0]).to.equal(group2ID); // this is an array so we need to compare only the first element

                expect(res.body[0].activeStatus).to.equal(true);
                expect(res.body[0].downlinkEnabled).to.equal(true);
                done();
            });
    });
});



describe('update "River Gauge #1" with a new group', function () {
    it('should send only new data to the API to update an existing gauge', function (done) {
        request(app).post('/api/addOrUpdateDevice')
            .send({
                displayName: "TestGauge #1",
                gpsLong: 56.4342,
                gpsLat: -7.5938,
                countryCode: "IE",
                sigfoxID: "ABC123",
                installDate: "2015-09-09T14:34:34Z",
                replacementDate: "2020-09-03T00:00:00Z",
                EOLDate: "2021-09-01T14:29:34Z",
                reportingFreq: "30",
                groupIDS: [
                    group1ID,
                    group2ID
                ],
                activeStatus: true,
                downlinkEnabled: true
            })
            .end(function (err, res) {

                // this should succeed because we have no group matching this name anymore
                //expect(res.body.displayName).to.equal("TestGauge #1");

                expect(res.body.gpsLong.$numberDecimal).to.equal('56.4342');
                expect(res.body.gpsLat.$numberDecimal).to.equal('-7.5938');

                expect(res.body.countryCode).to.equal("IE");

                expect(res.body.sigfoxID).to.equal("ABC123");
                expect(res.body.installDate).to.equal("2015-09-09T14:34:34.000Z"); // since Mongo appends the '.000' for milliseconds, we need to test for this also
                expect(res.body.replacementDate).to.equal("2020-09-03T00:00:00.000Z");
                expect(res.body.EOLDate).to.equal("2021-09-01T14:29:34Z"); // note no '.000' because there is a millisecond value already in the timestamp

                expect(res.body.reportingFreq).to.equal(30);

                expect(res.body.groupIDS[0]).to.equal(group1ID); // this is an array so we need to compare only the first element
                expect(res.body.groupIDS[1]).to.equal(group2ID);
                expect(res.body.activeStatus).to.equal(true);
                expect(res.body.downlinkEnabled).to.equal(true);

                // Make note of the ID
                gauge2ID = res.body._id
                done();
            });
    });
});




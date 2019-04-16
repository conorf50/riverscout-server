/*
    Code adapted from the following tutorial : https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz
*/

'use strict'; // causes program to fail on syntax errors

var app = require('../../app'),
    chai = require('chai'),
    request = require('supertest');

// we will get this ID from the database by making a GET request and selecting the first country that comes back.  
let testID = "";
var util = require("util")
var expect = chai.expect;
describe('Delete Countries', function () {
    describe('Get a country ID to delete', function () {
        it('should get all countries', function (done) {
            request(app).get('/api/getAllCountries')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    testID = res.body[0]._id;
                    console.log("Test country ID = " + testID)
                    done();
                });
        });
    });



    describe('Delete the selected country', function () {
        it('find and delete the selected country', function (done) {
            request(app).delete('/api/deleteCountry?countryID=' + testID)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    /*
                        A delete response will output the following:
                        {
                            "n": 1,
                            "ok": 1,
                            "deletedCount": 1
                        }
                    */
                    expect(res.body.deletedCount).to.equal(1)
                    expect(res.body.ok).to.equal(1);
                    expect(res.body.n).to.equal(1);


                    //console.log(res.text.countryCode);
                    done();
                });
        });
    });


    describe('Deleting the country again should fail', function () {
        it('should fail to delete a record that does not exist', function (done) {
            request(app).delete('/api/deleteCountry?countryID=' + testID)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    /*
                        This response will output the following:
                        No error occurs, hence the ok:1 output
                        {
                            "n": 1,
                            "ok": 1,
                            "deletedCount": 0
                        }
                    */
                    expect(res.body.deletedCount).to.equal(0)
                    expect(res.body.ok).to.equal(1);
                    expect(res.body.n).to.equal(0);


                    //console.log(res.text.countryCode);
                    done();
                });
        });
    });

});
/*
Below code adapted from the tutorial here
https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz


As mentioned in the tutorial, this is a configuration file
*/


'use strict';

module.exports = {
  env: 'production',
  db: 'mongodb://riverscout:riverscout@10.10.1.10/riverscout',
  port: process.env.PORT || 3000,
};
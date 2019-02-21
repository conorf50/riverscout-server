/*
Below code adapted from the tutorial here
https://www.codementor.io/olatundegaruba/integration-testing-supertest-mocha-chai-6zbh6sefz


As mentioned in the tutorial, this is a configuration file
*/


'use strict';

var mongoMemoryServer = require('mongodb-memory-server')
const mongod = new mongoMemoryServer();
 
const uri = await mongod.getConnectionString();
const port = await mongod.getPort();
const dbPath = await mongod.getDbPath();
const dbName = await mongod.getDbName();
var expect = chai.expect;



module.exports = {
  env: 'development',
  db : uri+port+dbPath+dbName,
  //db: 'mongodb://riverscout:riverscout@10.10.1.10/riverscout',
  port: process.env.PORT || 4000,
};
const { Pool } = require('pg');
const conString = require('./server_settings/elephantLogin.js');

const pool = new Pool({
  connectionString: conString,
  idleTimeoutMillis: 30000,// the amount of time that will pass before the client will spend to try to make a connection
  connectionTimeoutMillis: 2000, // This is the time limit for connecting to the db. If it takes too long the connection will fail
});

module.exports = pool;
//--------------------------------------------------------------------------------------------------
/*This creates a pool setup for the elephantSQL so that we can access the DB in our code*/ 
//--------------------------------------------------------------------------------------------------
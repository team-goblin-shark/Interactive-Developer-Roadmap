const { Pool } = require('pg');
const conString = require('./server_settings/elephantLogin.js');

const pool = new Pool({
  connectionString: conString,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  max: 5,
});

module.exports = pool;

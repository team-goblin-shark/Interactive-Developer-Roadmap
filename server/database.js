const { Pool } = require('pg');

const pool = new Pool({
  username: 'zepvalue',
  host: 'localhost',
  database: 'goblin-shark',
  password: 'linux',
  port: 5432,
});

module.exports = pool;

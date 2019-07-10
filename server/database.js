// // // for local database
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'node_admin',
//   host: 'localhost',
//   database: 'goblin_shark',
//   password: 'node_password',
//   port: 5432,
// });

// module.exports = pool;


const { Client } = require('pg');
const conString = require('./server_settings/elephantLogin.js');

module.exports = () => new Client(conString);

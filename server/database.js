// // for local database
// const { Client } = require('pg');

// module.exports = () => new Client({
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

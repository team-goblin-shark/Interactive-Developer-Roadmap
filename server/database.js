const { Client } = require('pg');
const conString = require('./server_settings/elephantLogin.js');

// module.exports = () => new Client(conString);

module.exports = () => new Client({
  user: 'joshuakim',
  host: 'localhost',
  database: 'goblin-shark',
  password: 37740200,
  port: 5432,
});
// const pool = new Pool({
//   user: 'armadillo',
//   host: 'localhost',
//   database: 'schema-armadillo',
//   password: 'pink',
//   port: 5432,
// });

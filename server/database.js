
const { Client } = require('pg');
const conString = require('./server_settings/elephantLogin.js');

module.exports = () => new Client(conString);


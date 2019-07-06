// imported Postges module
const pg = require('pg');
const conString = require('./server_settings/elephantLogin.js');

const client = new pg.Client(conString);

const dbController = {
  getData: (req, res) => {
    const queryString = 'SELECT resource FROM resources';
    client.connect();
    client.query(queryString, (err, result) => {
      if (err) throw err;
      res.send(result.rows);
      client.end();
    });
  },
};

module.exports = dbController;
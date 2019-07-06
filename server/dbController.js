const pg = require('pg');

const conString = 'postgres://kupqjigy:vzZUKkBtNXGMFp-r8jpmUdRp7L1_JJtY@raja.db.elephantsql.com:5432/kupqjigy';
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

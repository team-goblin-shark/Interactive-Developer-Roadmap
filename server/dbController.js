const faker = require('faker');
const pg = require('pg');
const conString = require('./server_settings/elephantLogin.js');

const client = new pg.Client(conString);

const dbController = {
  getData: (req, res) => {
    const { id } = req.params;
    const queryString = `SELECT categories.category, resources.resourceid, resources.resource FROM resources LEFT JOIN categories ON categories.categoryid = resources.categoryid WHERE resources.categoryId = ${id}`;
    client.connect();
    client.query(queryString, (err, result) => {
      if (err) res.status(err);
      res.send(result.rows);
      // client.end();
    });
  },
  getCategory: (req, res) => {
    const queryIdString = 'SELECT * FROM categories';
    client.connect();
    client.query(queryIdString, (err, result) => {
      if (err) res.status(err);
      res.send(result.rows);
      // client.end();
    });
  },
  fakeData: (req, res) => {
    client.connect();
    for (let i = 0; i < 75; i += 1) {
      const text = 'INSERT INTO resources (categoryID, resource) VALUES ($1, $2)';
      const values = [String((i % 3) + 1), faker.internet.url()];
      client.query(text, values, (err, result) => {
        if (err) throw err;
        console.log(result.rows);
      });
    }
    // client.end();
  },
};

module.exports = dbController;

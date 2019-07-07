const faker = require('faker');
const pool = require('./database.js');

const dbController = {
  getData: (req, res) => {
    const { id } = req.params;
    const queryString = `SELECT categories.category, resources.resourceid, resources.resource FROM resources LEFT JOIN categories ON categories.categoryid = resources.categoryid WHERE resources.categoryId = ${id}`;
    pool.query(queryString, (err, result) => {
      if (err) res.status(err);
      res.send(result.rows);
    });
  },
  getCategory: (req, res) => {
    const queryIdString = 'SELECT * FROM categories';
    pool.query(queryIdString, (err, result) => {
      if (err) res.status(err);
      res.send(result.rows);
    });
  },
  fakeData: (req, res) => {
    for (let i = 0; i < 75; i += 1) {
      const text = 'INSERT INTO resources (categoryID, resource) VALUES ($1, $2)';
      const values = [String((i % 3) + 1), faker.internet.url()];
      pool.query(text, values, (err, result) => {
        if (err) throw err;
      });
    }
  },
};

module.exports = dbController;

const faker = require('faker');
const pg = require('pg');
// const pool = require('./database.js');
const client = new pg.Client('postgres://kupqjigy:vzZUKkBtNXGMFp-r8jpmUdRp7L1_JJtY@raja.db.elephantsql.com:5432/kupqjigy');
const generateFakeResources = () => {
  client.connect();
  console.log('Hiii!');
  for (let i = 0; i < 45; i += 1) {
    const text = 'INSERT INTO resources (categoryid, link, author, iscommunity) VALUES ($1, $2, $3, $4)';
    const values = [String((i % 3) + 4), faker.internet.url(), faker.name.findName(), (!!Math.floor(Math.random() * 2))];
    client.query(text, values, (err, result) => {
      if (err) throw new Error(err);
      console.log(result.rows);
    });
  }
  for (let i = 0; i < 200; i += 1) {
    const text = 'INSERT INTO votes (resourceid, useremail, upvote) VALUES ($1, $2, $3)';
    const values = [(Math.floor(Math.random() * 45) + 45), faker.internet.email(), ((!!Math.floor(Math.random() * 2)))];
    client.query(text, values, (err, result) => {
      if (err) throw new Error(err);
      // console.log(result.rows);
    });
  }
  client.end();
};

// const generateFakeVotes = () => {
// };

generateFakeResources();
// generateFakeVotes();

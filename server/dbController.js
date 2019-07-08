const faker = require('faker');
// const pool = require('./database.js');




const dbController = {
  getData: (req, res) => {
    const { id } = req.params;
    const queryString = `
    SELECT  a.link,
            a.resourceid,
            SUM(case when b.upvote = TRUE then 1 else 0 end) sumUpvote,
            SUM(case when b.upvote = FALSE then 1 else 0 end) sumDownvote,
            SUM(case when b.upvote = TRUE then 1 else -0.5 end) score
    FROM    resources a
            JOIN votes b
                ON a.resourceid = b.resourceid
            WHERE a.categoryid = ${id}
    GROUP   BY b.resourceid, a.link, a.resourceid
      ORDER BY score DESC;`;
    pool.query(queryString, (err, result) => {
      if (err) return res.send(err);
      return res.send(result.rows);
    });
  },
  getCategory: (req, res) => {
    const queryIdString = 'SELECT * FROM categories';
    pool.query(queryIdString, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result.rows);
    });
  },
  generateFakeResources: (req,res,next) => {
    console.log('Hiii!');
    for (let i = 0; i < 45; i += 1) {
      const text = 'INSERT INTO resources (categoryid, link, author, iscommunity) VALUES ($1, $2, $3, $4)';
      const values = [String((i % 3) + 4), faker.internet.url(), faker.name.findName(), (!!Math.floor(Math.random() * 2))];
      pool.query(text, values, (err, result) => {
        if (err) throw new Error(err);
        console.log(result.rows);
        return next();
      });
    }
  },
  
  generateFakeVotes: () => {
    for (let i = 0; i < 300; i += 1) {
      const text = 'INSERT INTO votes (resourceid, useremail, upvote) VALUES ($1, $2, $3)';
      const values = [(Math.floor(Math.random() * 90) + 1), faker.internet.email(), ((!!Math.floor(Math.random() * 2)))];
      pool.query(text, values, (err, result) => {
        if (err) throw new Error(err);
        console.log(result.rows);
      });
    }
  },
};

module.exports = dbController;

const pool = require('../database.js');

const apiGetController = {
  getData: (req, res) => {
    const { id } = req.params;
    const queryString = `
      SELECT  a.link,
              a.resourceid,
              SUM(case when b.upvote = TRUE then 1 else 0 end) sumUpvote,
              SUM(case when b.upvote = FALSE then 1 else 0 end) sumDownvote,
              SUM(case when b.upvote = TRUE then 1 else -0.5 end) score
      FROM    resources a
              FULL JOIN votes b
                  ON a.resourceid = b.resourceid
              WHERE a.categoryid = ${id}
      GROUP   BY b.resourceid, a.link, a.resourceid
        ORDER BY score DESC;`;
    pool.connect();
    pool.query(queryString, (err, result) => {
      pool.end();
      if (err) return res.send(err);
      // console.log(result.rows);
      return res.send(result.rows);
    });
  },
  getCategory: (req, res) => {
    const queryIdString = 'SELECT * FROM categories';
    pool.connect();
    pool.query(queryIdString, (err, result) =>{
      pool.end();
      if (err) return res.send(err);
      res.send(result.rows);
      // pool.end();
    });
  },
  getFakeData: (req, res) => {
    pool.connect();
    for (let i = 0; i < 45; i += 1) {
      const text = 'INSERT INTO resources (categoryid, link, author, iscommunity) VALUES ($1, $2, $3, $4)';
      const values = [String((i % 3) + 4), faker.internet.url(), faker.name.findName(), (!!Math.floor(Math.random() * 2))];
      pool.query(text, values, (err, result) => {
        pool.end();
        console.log(result);
        if (err) console.log('Error ', err);


      });
    }
  },
};

module.exports = apiGetController;

const clientMaker = require('../database.js');

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

    const client = clientMaker();
    client.connect((err) => {
      // if(err) res.status(504).send('Internal error');
      client.query(queryString, (err, result) => {
        // if (err) return res.send(err);
        // console.log(result.rows);
        const results = result.rows;
        console.log('getController => getData => client.query', results);
        client.end();
        return res.status(200).send(results);
      });
    });
  },
  getCategory: (req, res) => {
    const queryIdString = 'SELECT * FROM categories';
    const client = clientMaker();
    client.connect((err) => {
      if (err) return res.status(504).send(err);
      client.query(queryIdString, (err, result) => {
        if (err) return res.status(504).send(err);
        const results = result.rows;
        client.end();
        return res.status(200).send(results);
      });
    });
  },
};

module.exports = apiGetController;

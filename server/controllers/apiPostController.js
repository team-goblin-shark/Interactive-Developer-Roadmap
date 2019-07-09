const client = require('../database.js');


const apiPostController = {
  postVote: (req, res) => {
    const useremail = res.locals.verifiedEmail;
    const { resourceid, upvote } = req.body;
    const text = 'INSERT INTO votes (resourceid, useremail, upvote) VALUES ($1, $2, $3) ON CONFLICT (resourceid, useremail) DO UPDATE  SET upvote = $3 RETURNING *';
    const values = [resourceid, useremail, upvote];
    client.query(text, values, (err, result) => {
      if (err) return res.send(err);
      console.log(result.rows);
      res.send(result.rows);
    });
  },

  postResource: (req, res) => {
    const { categoryid, link, author } = req.body;
    console.log(categoryid, link, author);
    const text = 'INSERT INTO resources (categoryid, link, author, iscommunity) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [categoryid, link, author, true];
    client.query(text, values, (err, result) => {
      console.log(result.rows);
      if (err) console.log('Error ', err);
      res.status(200).send(result.rows);
    });
  },
};

module.exports = apiPostController;

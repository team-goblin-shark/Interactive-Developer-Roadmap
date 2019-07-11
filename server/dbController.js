const faker = require('faker');
// const pg = require('pg');
//--------------------------------------------------------------------------------------------------
/*  The client is a bathtub. A pool is a pool. Only one client */ 
//--------------------------------------------------------------------------------------------------
const client = require('./database.js');
// const conString = require('./server_settings/elephantLogin.js');

// const client = new pg.Pool(conString);

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
            FULL JOIN votes b
                ON a.resourceid = b.resourceid
            WHERE a.categoryid = ${id}
    GROUP   BY b.resourceid, a.link, a.resourceid
      ORDER BY score DESC;`;
    client.query(queryString, (err, result) => {
      if (err) return res.send(err);
      // console.log(result.rows);
      return res.send(result.rows);
    });
  },
  getCategory: (req, res) => {
    const queryIdString = 'SELECT * FROM categories';
    client.query(queryIdString, (err, result) => {
      if (err) return res.send(err);
      res.send(result.rows);
      // client.end();
    });
  },

  submitVote: (req, res) => {
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

  submitResource: (req, res) => {
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

  submitEmail: (req, res) => {
    const email = req.body;
    console.log(email);
    client.query(text)
  },


  fakeData: (req, res) => {
    for (let i = 0; i < 45; i += 1) {
      const text = 'INSERT INTO resources (categoryid, link, author, iscommunity) VALUES ($1, $2, $3, $4)';
      const values = [String((i % 3) + 4), faker.internet.url(), faker.name.findName(), (!!Math.floor(Math.random() * 2))];
      client.query(text, values, (err, result) => {
        console.log(result);


        if (err) console.log('Error ', err);
        // console.log(result.rows);
      });
    }
  },

  // 🔥🔥🔥🔥 GET TOP THREE FUNCTION HERE TO PULL TOP THREE FROM DB AND SEND IT TO ENDPOINT
  getTopThree: (req, res) => {
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
      ORDER BY score DESC 
      LIMIT 3;`;
    client.query(queryString, (err, result) => {
      if (err) return res.send(err);
      // console.log(result.rows);
      return res.send(result.rows);
    });
  },
    // for (let i = 0; i < 120; i += 1) {
    //   const text = 'INSERT INTO votes (resourceid, useremail, upvote) VALUES ($1, $2, $3)';
    //   const values = [(Math.floor(Math.random() * 44) + 44), faker.internet.email(), ((!!Math.floor(Math.random() * 2)))];
    //   client.query(text, values, (err, result) => {
    //     if (err) return res.send(err);
    //     console.log(result.rows);
    //   });
    // }

    // client.end();
  
};

module.exports = dbController;

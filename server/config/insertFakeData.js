const faker = require('faker');
const client = require('../database.js');


const arr = ['Javascript', 'node', 'react', 'redux', 'express', 'react native'];

for (let i = 0; i < arr.length; i += 1) {
  const text = 'INSERT INTO categories (category) VALUES ($1)';
  const values = [arr[i]];
  client.query(text, values, (err, result) => {
    if (err) console.log('Error ', err);
  });
}


for (let i = 0; i < 200; i += 1) {
  const text = 'INSERT INTO resources (categoryid, link, author, iscommunity) VALUES ($1, $2, $3, $4)';
  const values = [String(Math.floor(Math.random() * (arr.length - 1)) + 1), faker.internet.url(), faker.name.findName(), (!!Math.floor(Math.random() * 2))];
  client.query(text, values, (err, result) => {
    if (err) console.log('Error ', err);
  });
}


for (let i = 0; i < 1000; i += 1) {
  const text = "INSERT INTO votes (resourceid, useremail, upvote) VALUES ($1, CRYPT($2, gen_salt('bf')), $3) ON CONFLICT (resourceid, useremail) DO UPDATE SET upvote = $3 RETURNING *";
  const email = faker.internet.email();
  const values = [String(Math.floor(Math.random() * 90) + 1), email, (!!Math.floor(Math.random() * 2))];
  client.query(text, values, (err, result) => {
    // if (result)console.log(result.rows);
    // console.log(email);
    // console.log('Finished adding votes \n All done!');
  });
}

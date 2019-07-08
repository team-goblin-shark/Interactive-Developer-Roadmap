const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getData, getCategory, generateFakeResources, generateFakeVotes } = require('./dbController.js');
const pool = require('./database.js');

const app = express();
const port = 3000;

// pool.connect((err) => {
//   if (err) throw new Error(err);
//   console.log('connected to Postgres!');
// });
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.get('/api/fakedata', generateFakeResources, generateFakeVotes);
app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);

app.use('/dist', express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}!`));

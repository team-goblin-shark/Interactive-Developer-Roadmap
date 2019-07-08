const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  getData,
  getCategory,
  // fakeData,
  submitVote,
} = require('./dbController.js');
const pool = require('./database.js');


const app = express();
const port = 3000;
pool.connect();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);

// app.get('/fakeData', tmpSomething, fakeData);
app.use('/dist', express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/api/vote/', submitVote);

app.listen(port, () => console.log(`listening on port ${port}!`));

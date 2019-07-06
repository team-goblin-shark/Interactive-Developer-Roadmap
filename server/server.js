const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getData, getCategory, fakeData } = require('./dbController.js');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.get('/', (req, res) => res.send('Hello World!'));

// app.get('/fakeData', fakeData);
app.use('/dist', express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);

app.listen(port, () => console.log(`listening on port ${port}!`));

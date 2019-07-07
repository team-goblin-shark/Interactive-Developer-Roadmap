const express = require('express');
const bodyParser = require('body-parser');
const { getData, getCategory, fakeData } = require('./dbController.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);


app.listen(port, () => console.log(`listening on port ${port}!`));
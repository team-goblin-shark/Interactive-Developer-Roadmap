const express = require('express');
const pg = require('pg');
const { getData } = require('./dbController.js');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', getData);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
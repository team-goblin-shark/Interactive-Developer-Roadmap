const express = require('express');
const { getData } = require('./dbController.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', getData);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
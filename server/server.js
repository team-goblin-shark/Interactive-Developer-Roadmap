const express = require('express');
const bodyParser = require('body-parser');
const { getData } = require('./dbController.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', getData);

app.listen(port, () => console.log(`listening on port ${port}!`));

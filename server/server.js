const express = require('express');
const { getData, fakeData } = require('./dbController.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.get('/', (req, res) => res.send('Hello World!'));

// app.get('/fakeData', fakeData);

app.get('/api', getData);



app.listen(port, () => console.log(`listening on port ${port}!`));

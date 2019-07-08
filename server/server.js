const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const {
  getData,
  getCategory,
  fakeData,
  submitVote,
  submitResource,
} = require('./dbController.js');
const pool = require('./database.js');
const oAuthController = require('./oAuthController');
// const { getData, getCategory, fakeData } = require('./dbController.js');


const app = express();
const port = 3000;
pool.connect();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.use(
  session({
    secret: 'banana-hammock',
    cookie: { maxAge: 60000 },
    // resave forces session to be saved back to the session store
    resave: false,
    // saveUninitialized forces session that is 'uninitialized' to be saved to the store
    saveUninitialized: false,
  }),
);

// app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);

app.get('/api/resources/:id', getData);


// create a route for the callbackURL
// this is the response from the GitHub OAuth server after client requests to use GitHub for Oauth
app.get('/login/callback', oAuthController.getoAuthCode, oAuthController.getAccessToken, oAuthController.getAPI);

app.get('/api/fakeData', fakeData);


app.use('/dist', express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/api/vote/', submitVote);

app.post('/api/resource/', submitResource);

app.listen(port, () => console.log(`listening on port ${port}!`));

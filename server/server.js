const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {
  getData,
  getCategory,
  fakeData,
  submitVote,
  submitResource,
  getTopThree,
} = require('./dbController.js');
const { getoAuthCode, getAccessToken, getAPI, jwtCookie } = require('./oAuthController');
const pool = require('./database.js');
// const oAuthController = require('./oAuthController');

const { cookieSecret } = require('./server_settings/oAuthSettings.js');
// const { getData, getCategory, fakeData } = require('./dbController.js');


const app = express();
const port = 3000;

pool.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

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



const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'sierra.swaby@gmail.com',
  from: 'sierra.swaby@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

// app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);

app.get('/api/resources/:id', getData);

// FETCH TO THIS TO GET TOP THREE PER CATEGORY🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 SIERRA LOOK HERE
app.get('/api/topThree/:id', getTopThree);


// create a route for the callbackURL
// this is the response from the GitHub OAuth server after client requests to use GitHub for Oauth
app.get('/api/login', getoAuthCode, getAccessToken, getAPI, jwtCookie);

app.get('/api/fakeData', fakeData);


app.use('/dist', express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
//--------------------------------------------------------------------------------------------------
/*  Make a request to this enpoint and  verifies user with oauth. This way Users can only submit votes once */ 
//--------------------------------------------------------------------------------------------------
app.post('/api/vote/', (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, cookieSecret, (err, result) => {
    if (err) throw err;
    else res.locals.verifiedEmail = result.email;
  });
  next();
}, submitVote);
// remember to uncomment this when we use oauth
app.post('/api/resource/', submitResource);

app.listen(port, () => console.log(`listening on port ${port}!`));

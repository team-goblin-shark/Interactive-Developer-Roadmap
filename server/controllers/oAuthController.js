// Create a middleware controller for OAuth
const request = require('request');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const { clientID, clientSecret, cookieSecret } = require('../server_settings/oAuthSettings');

const oAuthController = {
  // method for getting authorization code from GitHub oAuth server
  getoAuthCode: (req, res, next) => {
    const { code } = req.query;
    // take code and put it into res.locals
    // this allows subsequent middlewares to have access to access to it
    res.locals.code = code;
    next();
  },
  // method for getting access token after we get authorization code
  getAccessToken: (req, res, next) => {
    // We will need to send a post request to the access token url
    // It will need to include the authorization code and the client secret and client include
    // Import request module to make HTTP request from server
    request.post(
      {
        url: `https://github.com/login/oauth/access_token?${qs.stringify({
          client_id: clientID,
          client_secret: clientSecret,
          code: res.locals.code,
        })}`,
      },
      (err, result, body) => {
        if (err) console.error(err);
        // console.log(qs.parse(body), 'Eric!!!');
        req.session.access_token = qs.parse(body).access_token;
        next();
      },
    );
  },
  // method will use access token to check out the api and what it there
  getAPI: (req, res, next) => {
    request.get(
      {
        url: 'https://api.github.com/user/public_emails',
        headers: {
          Authorization: `token ${req.session.access_token}`,
          'User-Agent': 'Login-App',
        },
      },
      (err, response) => {
        if (err) throw err;
        const { email } = JSON.parse(response.body)[0];
        res.locals.email = email;
        next();
      },
    );
  },
  jwtCookie: (req, res) => {
    console.log('jwtCookie => res.locals.picture', res.locals.picture);
    const picture = res.locals.picture ? res.locals.picture : '';
    console.log('jwtCookie => picture', picture);
    const newJWT = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 30, email: res.locals.email, picture },
      cookieSecret,
    );
    res.cookie('jwtToken', newJWT);
    res.redirect('/main');
  },
};

module.exports = oAuthController;

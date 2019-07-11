const request = require('request');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const {
  client_id,
  client_secret,
  redirect_url,
  scopes,
} = require('../server_settings/googleAuthSettings');
const { cookieSecret } = require('../server_settings/oAuthSettings.js');

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_url);

const googleAuthController = {
  getGooglePicture: (req, res) => {
    const { jwtToken } = req.cookies;
    jwt.verify(jwtToken, cookieSecret, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).send({ message: 'error while verifying jwt' });
      }
      res.status(200).send({ picture: result.picture });
    });
  },
  redirectToGoogleSignOn: (req, res, next) => {
    // generating oauth url that directs client to login through google
    const url = oauth2Client.generateAuthUrl({
      access_type: 'online',
      scope: scopes,
    });
    console.log('redirecting to', url);
    res.redirect(url);
    // request.post(url, (error, response, body) => {
    //   if (error) {
    //     console.error(error);
    //     return res.status(400).send({ message: 'error in post request' });
    //   }
    //   console.log(response);
    //   return next();
    // });
  },
  getGoogleAuthCode: (req, res, next) => {
    const { code } = req.query;
    res.locals.code = code;
    // console.log('googleAuthController => getAuthCode', code);
    next();
  },
  getGoogleToken: async (req, res, next) => {
    const { code } = res.locals;
    const { tokens } = await oauth2Client.getToken(code);
    // console.log('googleAuthController => getGoogleToken => tokens', tokens);
    oauth2Client.setCredentials(tokens);
    res.locals.tokens = tokens;
    next();
  },
  getGoogleEmail: async (req, res, next) => {
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    oauth2.userinfo.get((err, result) => {
      if (err) return console.log(err);
      const { data } = result;
      // console.log(data);
      console.log(res.locals);

      res.locals = { email: data.email, name: data.name, picture: data.picture };
      console.log(res.locals);
      console.log(res.locals.picture);
      return next();
    });
    // const plus = google.plus({ version: 'v1', oauth2Client });
    // let me;
    // try {
    //   me = await plus.people.get({ userId: 'me' });
    // } catch (err) {
    //   console.error(err);
    // }
    // console.log('googleAuthController => getGoogleEmail', me);
  },
};

module.exports = googleAuthController;

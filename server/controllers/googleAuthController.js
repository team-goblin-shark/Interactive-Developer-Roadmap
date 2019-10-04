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
const url = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: scopes,
});
console.log('redirecting to', url);

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
  getGoogleAuthCode: (req, res, next) => {
    const { code } = req.query;
    res.locals.code = code;
    console.log('googleAuthController => getAuthCode', code);
    return next();
  },
  getGoogleToken: async (req, res, next) => {
    const { code } = res.locals;
    const { tokens } = await oauth2Client.getToken(code);
    console.log('googleAuthController => getGoogleToken => tokens', tokens);
    oauth2Client.setCredentials(tokens);
    res.locals.tokens = tokens;
    return next();
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
  },
};

module.exports = googleAuthController;

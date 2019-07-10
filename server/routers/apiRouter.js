const express = require('express');
const jwt = require('jsonwebtoken');
// const {
//   getData,
//   getCategory,
//   getFakeData,
//   submitVote,
//   submitResource,
// } = require('../controllers/dbController.js');
const { getData, getCategory, getFakeData } = require('../controllers/apiGetController.js');
const { postVote, postResource } = require('../controllers/apiPostController.js');
const {
  getoAuthCode, getAccessToken, getAPI, jwtCookie,
} = require('../controllers/oAuthController.js');
const { cookieSecret } = require('../server_settings/oAuthSettings.js');

const apiRouter = express.Router();

apiRouter.get('/category', getCategory);
apiRouter.get('/resources/:id', getData);

// create a route for the callbackURL
// this is the response from the GitHub OAuth server after client requests to use GitHub for Oauth
apiRouter.get('/login', getoAuthCode, getAccessToken, getAPI, jwtCookie);

// apiRouter.get('/fakeData', getFakeData);

apiRouter.post('/vote/', (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, cookieSecret, (err, result) => {
    if (err) throw err;
    else res.locals.verifiedEmail = result.email;
  });
  next();
}, postVote);

apiRouter.post('/resource/', postResource);

module.exports = apiRouter;
const jwt = require('jsonwebtoken');

const jwtController = {
  jwtCookie: (req, res) => {
    const newJWT = jwt.sign({ email: res.locals.email }, 'secret');
    console.log(newJWT, '***')
    res.cookie('jwtToken', newJWT);
    res.redirect('/');
  },
  jwtVerify: (req, res) => {
    jwt.verify()
  },
}

module.exports = jwtController;
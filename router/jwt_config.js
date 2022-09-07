const express_jwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const isRevokedCallback = (req, payload, done) => {
  //TODO
  return done(null, false);
};

module.exports = express_jwt({
    secret: process.env.SEED_AUTENTICACION,
    algorithms: ['HS256'],
    isRevoked: isRevokedCallback
  })
  .unless({
    path: ['/login', '/register',"/api-docs"]
  
});

module.exports =  getTokenData = (token) => {
  let data = null;
  jwt.verify(token, process.env.SEED_AUTENTICACION , (err, decoded) => {
      if(err) {
          console.log('Could not get data from token');
      } else {
          data = decoded;
      }
  });

  return data;
}




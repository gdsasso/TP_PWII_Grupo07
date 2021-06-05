const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authenticateJWT = (req, res, next) => {
  // authHeader = "Bearer {JWT}"
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [bearer, token] = authHeader.split(' ');

    jwt.verify(token, JWT_SECRET, (err, session) => {
      if (err) {
        console.error('Error al verificar el JWT', err);
        return res.sendStatus(403);
      }

      req.session = session;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
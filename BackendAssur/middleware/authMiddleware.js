const { verifyToken } = require('../utils/jwt');
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing Token' });
  }

  try {
    const decodedToken = verifyToken(token);
    console.log('Decoded Token:', decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }
};

module.exports = authenticateToken;

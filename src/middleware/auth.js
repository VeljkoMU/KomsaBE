const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
  
    const token = authHeader.split('Bearer ')[1];
  
    try {
      const authUser = jwt.verify(token, process.env.JWT_SECRET);
      req.body.auth = token;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = auth;
// server/src/middleware/auth.js
/**
 * @file JWT authentication middleware
 */

import jwt from 'jsonwebtoken';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * TODO: verify the token exists and add the user data to the request object
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Missing Authorization header' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ message: 'Malformed Authorization header' });
    return;
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment');
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  try {
    // jwt.verify can return a string or object. Narrow it below:
    const result = jwt.verify(token, secret);
    if (typeof result === 'string') {
      // we expected an object payload, so treat a string as bad
      res.status(403).json({ message: 'Invalid token payload' });
      return;
    }

    req.user = result;
    return next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};


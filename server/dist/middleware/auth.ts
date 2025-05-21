import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload { userId: number; }

declare module 'express-serve-static-core' {
  interface Request { user?: JwtPayload; }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Missing Authorization header' });
    return;
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ message: 'Malformed Authorization header' });
    return;
  }
  const secret = process.env.JWT_SECRET_KEY!;
  try {
    const payload = jwt.verify(token, secret);
    if (typeof payload === 'object') {
      req.user = payload as JwtPayload;
      return next();
    } else {
      res.status(403).json({ message: 'Invalid token payload' });
      return;
    }
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

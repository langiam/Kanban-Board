// server/src/routes/auth-routes.ts
import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  console.log('🔔 login handler hit');
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // ————————————————————————————————————————————————
    // 📌 Pull in and log the secret BEFORE signing
    const secret = process.env.JWT_SECRET_KEY as string | undefined;
    console.log('📥 req.body:', req.body);
    console.log('🔑 JWT_SECRET_KEY:', secret);
    if (!secret) {
      console.error('❌ JWT_SECRET_KEY is undefined');
      return res
        .status(500)
        .json({ message: 'Authentication misconfiguration.' });
    }
    // ————————————————————————————————————————————————

    const payload = { userId: user.id };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error('🔥 Login error:', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

const router = Router();
// POST /auth/login - Login a user
router.post('/login', login);
export default router;

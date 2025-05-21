import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
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
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        console.error('❌ JWT_SECRET_KEY is not defined in environment');
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    }
    catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
};

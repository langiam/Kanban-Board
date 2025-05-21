// server/src/server.ts
// 1️⃣ Load .env first
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './config/connection.js';
import authRouter from './routes/auth-routes.js';
import apiRouter from './routes/api/index.js';
async function startServer() {
    try {
        // 2️⃣ Check that the JWT secret is defined
        console.log('🔍 JWT_SECRET_KEY =', process.env.JWT_SECRET_KEY);
        // 3️⃣ Connect & sync your database
        await db.sync();
        console.log('✅ Database connected and synced');
        // 4️⃣ Create Express app
        const app = express();
        const PORT = parseInt(process.env.PORT || '3001', 10);
        // 5️⃣ Middleware: CORS + body parsing
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        // 6️⃣ Mount your routes
        app.use('/auth', authRouter);
        app.use('/api', apiRouter);
        // 7️⃣ Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('❌ Server failed to start:', err);
    }
}
startServer();

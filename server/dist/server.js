import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/connection.js';
import authRouter from './routes/auth-routes.js';
import apiRouter from './routes/api/index.js';
dotenv.config();
async function startServer() {
    try {
        // 1. Connect & sync your database
        await db.sync();
        console.log('✅ Database connected and synced');
        // 2. Create Express app
        const app = express();
        const PORT = parseInt(process.env.PORT || '3001', 10);
        // 3. Middleware: CORS + built-in body parsers
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        // 4. Mount REST routes
        app.use('/auth', authRouter);
        app.use('/api', apiRouter);
        // 5. Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('❌ Server failed to start:', err);
    }
}
startServer();

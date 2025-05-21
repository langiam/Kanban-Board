// server/src/routes/api/index.ts
import { Router } from 'express';
import { ticketRouter } from '../api/ticket-routes.js';
import { userRouter }   from '../api/user-routes.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

// TODO: Protect all /api routes
router.use(authenticateToken);

// Mount your resource routers
router.use('/tickets', ticketRouter);
router.use('/users',   userRouter);

export default router;

// server/src/config/connection.ts
import 'dotenv/config';       // load .env first
import { Sequelize } from 'sequelize';
import User,   { UserFactory   } from '../models/user.js';
import Ticket, { TicketFactory } from '../models/ticket.js';

const sequelize = new Sequelize(
  process.env.DB_NAME!,       // assert non-null
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host:    process.env.DB_HOST!,
    port:    parseInt(process.env.DB_PORT!, 10),
    dialect: 'postgres',
    logging: false,
  }
);

// ─── Initialize all your models ───────────────────
UserFactory(sequelize);
TicketFactory(sequelize);
// ─────────────────────────────────────────────────

export default sequelize;

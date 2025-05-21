// server/src/config/connection.ts
import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { UserFactory }   from '../models/user.js';
import { TicketFactory } from '../models/ticket.js';


const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host:    process.env.DB_HOST!,
    port:    parseInt(process.env.DB_PORT!, 10),
    dialect: 'postgres',
    logging: false,
  }
);

// initialize all models via their factories
UserFactory(sequelize);
TicketFactory(sequelize);

export default sequelize;

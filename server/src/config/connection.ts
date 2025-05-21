// server/src/config/connection.ts
import 'dotenv/config';
import { Sequelize } from 'sequelize';

import User,   { UserFactory   } from '../models/user.js';
import Ticket, { TicketFactory } from '../models/ticket.js';

const sequelize = new Sequelize({
  host:     process.env.DB_HOST!,                // e.g. "localhost"
  port:     parseInt(process.env.DB_PORT!, 10),  // e.g. 5432
  database: process.env.DB_NAME!,                // e.g. "kanban_db"
  username: process.env.DB_USER!,                // e.g. "postgres"
  password: process.env.DB_PASS!,                // e.g. "postgres"
  dialect:  'postgres',                          // must be supplied
  logging:  false,                               // turn off SQL logging
});

// Initialize your models
UserFactory(sequelize);
TicketFactory(sequelize);

// Define associations
User.hasMany(Ticket, {
  foreignKey: 'assignedUserId',
  as:         'tickets',
});
Ticket.belongsTo(User, {
  foreignKey: 'assignedUserId',
  as:         'assignedUser',
});

export default sequelize;

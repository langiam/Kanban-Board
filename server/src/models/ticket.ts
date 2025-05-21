import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// 1. Define the shape of a Ticket
interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId: number | null;
}

// 2. Specify which attributes are optional when creating
interface TicketCreationAttributes
  extends Optional<TicketAttributes, 'id'> {}

export class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 3. Factory to initialize it with a Sequelize instance
export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type:           DataTypes.INTEGER,
        autoIncrement:  true,
        primaryKey:     true,
      },
      name: {
        type:      DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type:      DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type:      DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type:      DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'tickets',
      sequelize,
    }
  );

  return Ticket;
}

// 4. Default‐export so other files can do `import Ticket from '../models/ticket.js'`
export default Ticket;

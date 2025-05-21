import { DataTypes, Model } from 'sequelize';
export class Ticket extends Model {
}
// 3. Factory to initialize it with a Sequelize instance
export function TicketFactory(sequelize) {
    Ticket.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        assignedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'tickets',
        sequelize,
    });
    return Ticket;
}
// 4. Default‐export so other files can do `import Ticket from '../models/ticket.js'`
export default Ticket;

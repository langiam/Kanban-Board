// server/src/models/user.ts
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
export class User extends Model {
    async setPassword(password) {
        this.password = await bcrypt.hash(password, 10);
    }
}
export function UserFactory(sequelize) {
    User.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
    }, {
        tableName: 'users',
        sequelize,
        hooks: {
            beforeCreate: (user) => user.setPassword(user.password),
            beforeUpdate: (user) => user.setPassword(user.password),
        },
    });
    return User;
}
export default User;

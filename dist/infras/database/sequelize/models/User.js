"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInitialization = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
const init = (sequelize) => {
    User.init({
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: 'user',
    });
};
const applyRelations = (models) => {
    const { Task } = models;
    User.hasMany(Task, { foreignKey: 'userId' });
};
exports.UserInitialization = {
    init,
    applyRelations,
};
//# sourceMappingURL=User.js.map
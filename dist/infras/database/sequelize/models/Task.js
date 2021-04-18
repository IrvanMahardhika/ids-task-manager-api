"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInitialization = exports.Task = void 0;
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
const init = (sequelize) => {
    Task.init({
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
        },
        isCompleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        tableName: 'task',
    });
};
const applyRelations = (models) => {
    const { User, Note } = models;
    Task.belongsTo(User, { foreignKey: 'userId' });
    Task.hasMany(Note, { foreignKey: 'taskId' });
};
exports.TaskInitialization = {
    init,
    applyRelations,
};
//# sourceMappingURL=Task.js.map
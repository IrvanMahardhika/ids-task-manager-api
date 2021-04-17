"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInitialization = exports.Task = void 0;
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
const init = (sequelize) => {
    Task.init({
        title: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: 'task',
    });
};
const applyRelations = (models) => {
    // apply relations here
};
exports.TaskInitialization = {
    init,
    applyRelations,
};
//# sourceMappingURL=Task.js.map
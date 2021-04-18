"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteInitialization = exports.Note = void 0;
const sequelize_1 = require("sequelize");
class Note extends sequelize_1.Model {
}
exports.Note = Note;
const init = (sequelize) => {
    Note.init({
        taskId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        text: {
            type: sequelize_1.DataTypes.TEXT,
        },
    }, {
        sequelize,
        tableName: 'note',
    });
};
const applyRelations = (models) => {
    const { Task } = models;
    Note.belongsTo(Task, { foreignKey: 'taskId' });
};
exports.NoteInitialization = {
    init,
    applyRelations,
};
//# sourceMappingURL=Note.js.map
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('task', 'isCompleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('task', 'isCompleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
};

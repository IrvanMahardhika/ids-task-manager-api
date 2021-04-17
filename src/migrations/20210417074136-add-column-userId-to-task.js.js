'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('task', 'userId', {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('task', 'userId', {
      type: Sequelize.INTEGER,
    });
  },
};

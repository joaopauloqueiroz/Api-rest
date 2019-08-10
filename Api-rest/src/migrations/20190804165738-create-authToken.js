'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('AuthTokens', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AuthTokens')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

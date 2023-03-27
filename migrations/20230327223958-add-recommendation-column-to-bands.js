'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('bands', 'recomendation', {
      type:DataTypes.STRING
    })
    
      await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('bands', 'recomendation')
  }
};

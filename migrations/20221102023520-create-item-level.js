'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemLevels', {
      idItem: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
          model: 'Items',
          key: 'id',
          as: 'IDITEM'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      idLevel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Levels',
          key: 'id',
          as: 'IDLEVEL'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ItemLevels');
  }
};
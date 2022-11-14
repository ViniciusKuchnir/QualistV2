'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Responsibles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: "VARCHAR(30)",
        allowNull: false,
      },
      SectorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Sectors',
          key: 'id',
          as: 'IDSECTOR'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Companies',
          key: 'id',
          as: 'IDCOMPANY'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      email:{
        type: "VARCHAR(60)",
        allowNull: false,
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
    await queryInterface.dropTable('Responsibles');
  }
};
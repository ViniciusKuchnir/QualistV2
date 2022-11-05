'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      confirmado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      descricao: {
        type: "VARCHAR(700)",
        allowNull: false,
      },
      prazo: {
        type: "DATE",
        allowNull: true,
      },
      justificativa: {
        type: "VARCHAR(200)",
        allowNull: true,
      },
      idChecklist: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Checklists',
          key: 'id',
          as: 'IDCHECKLIST'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      idClassification: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Classifications',
          key: 'id',
          as: 'IDCLASSIFICATION'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      idResponsible: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Responsibles',
          key: 'id',
          as: 'IDRESPONSIBLE'
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
    await queryInterface.dropTable('Items');
  }
};
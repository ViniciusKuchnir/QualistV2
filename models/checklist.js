'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Checklist.hasMany(models.Item,{
        as: 'checklist'
      });
      Checklist.belongsTo(models.Company,{
        foreignKey: 'id',
        as: 'companychecklists'
      });
    }
  }
  Checklist.init({
    nome: DataTypes.STRING,
    CompanyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Checklist',
    tableName: 'Checklists',
  });
  return Checklist;
};
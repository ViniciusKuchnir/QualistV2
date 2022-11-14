'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Checklist,{
        as: 'companychecklists'
      });
      Company.hasMany(models.Responsible,{
        as: 'IDRESPONSIBLE'
      });
      Company.hasMany(models.Classification,{
        as: 'IDCLASSIFICATION'
      });
    }
  }
  Company.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'Companies',
  });
  return Company;
};
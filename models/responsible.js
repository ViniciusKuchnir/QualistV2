'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsible extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Responsible.hasMany(models.Item,{
        as: 'responsible'
      });
      Responsible.belongsTo(models.Sector,{
        foreignKey: 'id',
        as: 'sector'
      });
      Responsible.belongsTo(models.Company,{
        foreignKey: 'id',
        as: 'IDCOMPANY'
      })
    }
  }
  Responsible.init({
    nome: DataTypes.STRING,
    SectorId: DataTypes.INTEGER,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Responsible',
    tableName: 'Responsibles',
  });
  return Responsible;
};
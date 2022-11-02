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
        as: 'IDITEM'
      });
      Responsible.belongsTo(models.Sector,{
        foreignKey: 'id',
        as: 'IDSECTOR'
      });
    }
  }
  Responsible.init({
    nome: DataTypes.STRING,
    idSector: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Responsible',
    tableName: 'Responsibles',
  });
  return Responsible;
};
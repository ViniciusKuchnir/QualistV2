'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sector.hasMany(models.Responsible,{
        as: 'IDRESPONSIBLE'
      });
      Sector.belongsTo(models.Company,{
        foreignKey: 'id',
        as: 'IDCOMPANY'
      })
    }
  }
  Sector.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sector',
    tableName: 'Sectors'
  });
  return Sector;
};
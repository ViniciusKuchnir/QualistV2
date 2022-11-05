'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Classification.hasMany(models.Item,{
        as: 'IDITEM'
      });
      Classification.belongsTo(models.Company,{
        foreignKey: 'id',
        as: 'IDCOMPANY'
      })
    }
  }
  Classification.init({
    descricao: DataTypes.STRING,
    prazo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classification',
    tableName: 'Classifications',
  });
  return Classification;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Level.belongsTo(models.Model, {
        foreignKey: 'id',
        as: 'IDMODEL'
      });   
    }
  }
  Level.init({
    nivel: DataTypes.CHAR,
    idModel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Level',
    tableName: 'Levels',
  });
  return Level;
};
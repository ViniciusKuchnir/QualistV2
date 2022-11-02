'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pattern extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pattern.hasMany(models.Checklist,{
        as: 'IDCHECKLIST'
      });
      Pattern.hasMany(models.Level,{
        as: 'IDLEVEL'
      });
    }
  }
  Pattern.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pattern',
    tableName: 'Patterns',
  });
  return Pattern;
};
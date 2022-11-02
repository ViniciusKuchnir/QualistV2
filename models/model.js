'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Model.hasMany(models.Checklist,{
        as: 'IDCHECKLIST'
      });
      Model.hasMany(models.Level,{
        as: 'IDLEVEL'
      });
    }
  }
  Model.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Model',
    tableName: 'Models',
  });
  return Model;
};
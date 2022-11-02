'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Item.belongsToMany(models.Level,{
        foreignKey: 'id',
        as: 'IDLEVEL'
      })
      models.Level.belongsToMany(models.Item,{
        foreignKey: 'id',
        as: 'IDITEM'
      })
    }
  }
  ItemLevel.init({
    idItem: DataTypes.INTEGER,
    idLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemLevel',
    tableName: 'ItemLevels',
  });
  return ItemLevel;
};
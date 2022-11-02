'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Checklist,{
        foreignKey: 'id',
        as: 'IDCHECKLIST'
      });
      Item.belongsTo(models.Classification,{
        foreignKey: 'id',
        as: 'IDCLASSIFICATION'
      });
      Item.belongsTo(models.Responsible,{
        foreignKey: 'id',
        as: 'IDRESPONSIBLE'
      });

    }
  }
  Item.init({
    confirmado: DataTypes.BOOLEAN,
    descricao: DataTypes.STRING,
    prazo: DataTypes.DATEONLY,
    idChecklist: DataTypes.INTEGER,
    idClassification: DataTypes.INTEGER,
    idResponsible: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items',
  });
  return Item;
};
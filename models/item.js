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
        foreignKey: 'checklistId',
        as: 'checklist'
      });
      Item.belongsTo(models.Classification,{
        foreignKey: 'ClassificationId',
        as: 'classification'
      });
      Item.belongsTo(models.Responsible,{
        foreignKey: 'ResponsibleId',
        as: 'responsible'
      });

    }
  }
  Item.init({
    confirmado: DataTypes.BOOLEAN,
    descricao: DataTypes.STRING,
    prazo: DataTypes.DATEONLY,
    justificativa: DataTypes.STRING,
    ChecklistId: DataTypes.INTEGER,
    ClassificationId: DataTypes.INTEGER,
    ResponsibleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items',
  });
  return Item;
};
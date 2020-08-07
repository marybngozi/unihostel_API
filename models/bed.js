'use strict';
const {hashPassword} = require('../utils/hash');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bed extends Model {
    
    static associate({Bed, Room, Hostel}) {
      // define association here
      Bed.belongsTo(Room, {foreignKey: 'roomId'});
      Bed.belongsTo(Hostel, {foreignKey: 'hostelId'});
    }
  };

  Bed.init({
    bedCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    deletedStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabledStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Bed',
    tableName: 'beds',
  });

  return Bed;
};
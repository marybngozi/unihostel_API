'use strict';
const {hashPassword} = require('../utils/hash');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hostel extends Model {
    
    static associate({Hostel}) {
      // define association here
      // Hostel.belongsTo(Hostel, {foreignKey: 'hostelId'});
    }
  };

  Hostel.init({
    hostelCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    genderType: {
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
    modelName: 'Hostel',
    tableName: 'hostels',
  });

  return Hostel;
};
'use strict';
const {hashPassword} = require('../utils/hash');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    
    static associate({Room, Hostel}) {
      // define association here
      Room.belongsTo(Hostel, {foreignKey: 'hostelId'});
    }
  };

  Room.init({
    roomCode: {
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
    modelName: 'Room',
    tableName: 'rooms',
  });

  return Room;
};
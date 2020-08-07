'use strict';
const {hashPassword} = require('../utils/hash');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate({User, Bed, Room, Hostel}) {
      // define association here
      User.belongsTo(Bed, {foreignKey: 'bedId'});
      User.belongsTo(Room, {foreignKey: 'roomId'});
      User.belongsTo(Hostel, {foreignKey: 'hostelId'});
    }
  };

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    level: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    otherName: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    deletedStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    suspendAt: {
      type: DataTypes.DATE,
    },
    suspendStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  // Hash Password
  User.beforeCreate(async (user) => {
    user.password = await hashPassword(user.password);
  });

  return User;
};
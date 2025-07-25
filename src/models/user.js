'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { SALT } = require('../config/server-config.js');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING
    },
    email:{
      type:DataTypes.STRING
    },
    password: {
      type:DataTypes.STRING
    },
    contactNumber: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (User, options) => {
    const hashedPassword = await bcrypt.hash(User.password, parseInt(SALT));
    User.password = hashedPassword;
  });

  return User;
};


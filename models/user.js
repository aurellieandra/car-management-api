'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }

  User.init({
    nama: DataTypes.STRING,
    class: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: {
        args: true,
        msg: 'Email address is already in use!'
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (record, options) => {
        record.password = bcrypt.hashSync(record.password, 10)
      }
    },
    sequelize
  });

  User.associate = function (models) {
    User.belongsToMany(models.Car, { through: 'History' })
  }

  return User;
};
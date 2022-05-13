'use strict';
const Cars = require('./car')
const Users = require('./user')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class History extends Model { }

  History.init({
    CarId: {
      type: DataTypes.INTEGER,
      references: {
        model: Cars,
        key: Cars.id
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: Users.id
      }
    }
  }, {
    sequelize
  });

  History.associate = function (models) {
    History.belongsTo(models.Car)
    History.belongsTo(models.User)
  }

  return History;
};
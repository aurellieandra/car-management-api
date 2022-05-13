'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Car extends Model { }

  Car.init({
    nama: DataTypes.STRING,
    tipe: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    ukuran: DataTypes.STRING,
    available: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize
  });

  Car.associate = function (models) {
    Car.belongsToMany(models.User, { through: 'History' })
  }

  return Car;
};
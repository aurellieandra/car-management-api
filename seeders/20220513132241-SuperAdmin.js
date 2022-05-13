'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', originalData, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'Users',
      {
        [Sequelize.Op.or]: [{ name: 'Seed-Diandra' }, { name: 'Seed-Andra' }]
      }, {})
  }
};

const originalData = [
  {
    "nama": "Seed-Diandra",
    "class": "SuperAdmin",
    "email": "seed-diandra-sa@mail.com",
    "password": "$2b$10$5U4QcNpj5DR96vIAL19UYOl7FMmxKBY1n/WtJFasvO2TGo.Vc6U6u", //diandra-sa
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "nama": "Seed-Andra",
    "class": "SuperAdmin",
    "email": "seed-andra-sa@mail.com",
    "password": "$2b$10$oFuwwP2mG5em4kyEAEpGX.YRRP1WkDP79Bqhi.ZhmVxmrZlSr7y66", //andra-sa
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]
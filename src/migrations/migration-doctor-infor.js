'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Doctor_Infor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },


      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      provinceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.STRING
      },

      addressClinic: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      nameClinic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Doctor_Infor');
  }
};
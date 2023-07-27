"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users_table", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM("admin", "user"),
        defaultValue: "user",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users_table");
  },
};

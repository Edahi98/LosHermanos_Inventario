
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable('categoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre_categoria: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable('categoria');
  }
};

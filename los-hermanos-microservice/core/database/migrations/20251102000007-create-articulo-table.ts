
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable('articulo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      stok: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      precio_venta: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      precio_compra: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      nombre_articulo: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      modelos_compatibles: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fecha_publicacion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categoria',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      marca_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'marca',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('articulo');
  }
};

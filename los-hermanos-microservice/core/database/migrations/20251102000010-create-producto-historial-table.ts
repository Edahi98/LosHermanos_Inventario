import { DataTypes, QueryInterface } from "sequelize";

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("ProductoHistorial", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      articuloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Articulo",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      stockAnterior: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stockNuevo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidadVendida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precioUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      precioTotalSinImpuesto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      impuestos: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "JSON con detalles de impuestos aplicados",
      },
      precioFinal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      razonMovimiento: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Venta",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("ProductoHistorial");
  },
};

import { DataTypes, QueryInterface } from "sequelize";

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Venta", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      articuloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Articulo",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precioFinal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Venta");
  },
};

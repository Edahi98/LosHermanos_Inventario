import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database/connection.ts";

export class Venta extends Model {
  public id!: number;
  public articuloId!: number;
  public quantity!: number;
  public precioFinal!: number;
  public readonly createdAt!: Date;
}

Venta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    articuloId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioFinal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Venta",
    tableName: "Venta",
    timestamps: true,
    updatedAt: false,
  }
);

export default Venta;

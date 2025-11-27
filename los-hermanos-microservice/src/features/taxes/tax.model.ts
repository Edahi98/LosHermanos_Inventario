import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database/connection.ts";

export class Tax extends Model {
  public id!: number;
  public name!: string;
  public percentage!: number;
  public description?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Tax.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Tax",
    tableName: "Tax",
    timestamps: true,
    updatedAt: true,
  }
);

export default Tax;
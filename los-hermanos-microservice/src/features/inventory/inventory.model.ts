import { DataTypes, Model } from "sequelize";
import sequelize from "../../../core/database/connection.ts";

export class Articulo extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public precio!: number;
  public stock!: number;
  public marcaId!: number;
  public categoriaId!: number;
}

Articulo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marcaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Marca",
        key: "id",
      },
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categoria",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Articulo",
    tableName: "Articulo",
    timestamps: false,
  }
);

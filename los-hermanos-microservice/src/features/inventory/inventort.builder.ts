import { Articulo } from "./inventory.model.ts";

export class InventoryBuilder {
  private articulo: Articulo;

  constructor(articulo: Articulo) {
    this.articulo = articulo;
  }

  public build() {
    return {
      id: this.articulo.id,
      nombre: this.articulo.nombre,
      descripcion: this.articulo.descripcion,
      precioFinal: this.articulo.precio,
      stockRestante: this.articulo.stock,
    };
  }
}

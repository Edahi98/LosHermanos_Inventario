import { Articulo } from "./inventory.model.ts";

interface InventoryResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precioBase: number;
  precioFinal: number;
  stockRestante: number;
  impuestos?: Record<string, unknown>;
}

export class InventoryBuilder {
  private articulo: Articulo;
  private impuestos?: Record<string, unknown>;

  constructor(articulo: Articulo, impuestos?: Record<string, unknown>) {
    this.articulo = articulo;
    this.impuestos = impuestos;
  }

  /**
   * Construye la respuesta del inventario con información de impuestos
   * @returns Objeto con la información formateada del inventario
   */
  public build(): InventoryResponse {
    return {
      id: this.articulo.id,
      nombre: this.articulo.nombre,
      descripcion: this.articulo.descripcion,
      precioBase: this.articulo.precio,
      precioFinal: this.articulo.precio,
      stockRestante: this.articulo.stock,
      ...(this.impuestos && { impuestos: this.impuestos }),
    };
  }

  /**
   * Establece los impuestos
   * @param impuestos - Configuración de impuestos
   * @returns this para encadenamiento de métodos
   */
  public setImpuestos(impuestos: Record<string, unknown>): this {
    this.impuestos = impuestos;
    return this;
  }

  /**
   * Obtiene el artículo
   * @returns El artículo del builder
   */
  public getArticulo(): Articulo {
    return this.articulo;
  }

  /**
   * Obtiene los impuestos
   * @returns Los impuestos configurados
   */
  public getImpuestos(): Record<string, unknown> | undefined {
    return this.impuestos;
  }
}

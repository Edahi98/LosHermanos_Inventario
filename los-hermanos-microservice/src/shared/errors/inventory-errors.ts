export class InventoryError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "InventoryError";
  }
}

export class InsufficientStockError extends InventoryError {
  constructor(articuloId: number, requested: number, available: number) {
    super(
      "INSUFFICIENT_STOCK",
      400,
      `Stock insuficiente para artículo ${articuloId}. Solicitado: ${requested}, Disponible: ${available}`,
    );
  }
}

export class ArticuloNotFoundError extends InventoryError {
  constructor(articuloId: number) {
    super("ARTICULO_NOT_FOUND", 404, `Artículo con ID ${articuloId} no encontrado`);
  }
}

export class InvalidQuantityError extends InventoryError {
  constructor(quantity: number) {
    super(
      "INVALID_QUANTITY",
      400,
      `Cantidad inválida: ${quantity}. Debe ser un número positivo`,
    );
  }
}

export class CategoriaNotFoundError extends InventoryError {
  constructor(categoriaId: number) {
    super("CATEGORIA_NOT_FOUND", 404, `Categoría con ID ${categoriaId} no encontrada`);
  }
}

export class MarcaNotFoundError extends InventoryError {
  constructor(marcaId: number) {
    super("MARCA_NOT_FOUND", 404, `Marca con ID ${marcaId} no encontrada`);
  }
}

export class DuplicateArticuloError extends InventoryError {
  constructor(nombre: string) {
    super(
      "DUPLICATE_ARTICULO",
      409,
      `Un artículo con el nombre "${nombre}" ya existe`,
    );
  }
}

export class InvalidPriceError extends InventoryError {
  constructor(price: number) {
    super(
      "INVALID_PRICE",
      400,
      `Precio inválido: ${price}. Debe ser un número positivo`,
    );
  }
}

export class InventoryHistoryError extends InventoryError {
  constructor(message: string) {
    super("HISTORY_ERROR", 500, `Error al registrar historial: ${message}`);
  }
}

export function isInventoryError(error: unknown): error is InventoryError {
  return error instanceof InventoryError;
}

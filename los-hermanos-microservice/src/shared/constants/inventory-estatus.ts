/**
 * Estados posibles de un artículo en inventario
 */
export enum InventoryStatus {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
  DISCONTINUADO = "DISCONTINUADO",
  FALTA_STOCK = "FALTA_STOCK",
  REORDEN = "REORDEN",
}

/**
 * Mensajes descriptivos para cada estado
 */
export const INVENTORY_STATUS_MESSAGES: Record<InventoryStatus, string> = {
  [InventoryStatus.ACTIVO]: "Artículo disponible en inventario",
  [InventoryStatus.INACTIVO]: "Artículo inactivo temporalmente",
  [InventoryStatus.DISCONTINUADO]: "Artículo descontinuado",
  [InventoryStatus.FALTA_STOCK]: "Sin stock disponible",
  [InventoryStatus.REORDEN]: "Necesita reorden de stock",
};

/**
 * Validación de estados
 */
export const VALID_INVENTORY_STATUSES = Object.values(InventoryStatus);

export function isValidInventoryStatus(status: string): status is InventoryStatus {
  return VALID_INVENTORY_STATUSES.includes(status as InventoryStatus);
}

/**
 * Razones por las que el stock puede cambiar
 */
export enum StockMovementReason {
  VENTA = "VENTA",
  AJUSTE_MANUAL = "AJUSTE_MANUAL",
  DEVOLUCION = "DEVOLUCION",
  PERDIDA = "PERDIDA",
  REORDEN = "REORDEN",
  CORRECCION_INVENTARIO = "CORRECCION_INVENTARIO",
  TRANSFERENCIA = "TRANSFERENCIA",
}

/**
 * Configuración de límites de inventario
 */
export const INVENTORY_LIMITS = {
  MIN_STOCK_ALERT: 5,
  REORDER_POINT: 10,
  MAX_STOCK_WARNING: 1000,
};

/**
 * Validación de cantidad
 */
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0;
}

/**
 * Obtiene el estado basado en la cantidad de stock
 */
export function getStatusByStock(
  stock: number,
  reorderPoint: number = INVENTORY_LIMITS.REORDER_POINT,
): InventoryStatus {
  if (stock === 0) {
    return InventoryStatus.FALTA_STOCK;
  }
  if (stock <= reorderPoint) {
    return InventoryStatus.REORDEN;
  }
  return InventoryStatus.ACTIVO;
}

export default {
  InventoryStatus,
  INVENTORY_STATUS_MESSAGES,
  VALID_INVENTORY_STATUSES,
  isValidInventoryStatus,
  StockMovementReason,
  INVENTORY_LIMITS,
  isValidQuantity,
  getStatusByStock,
};

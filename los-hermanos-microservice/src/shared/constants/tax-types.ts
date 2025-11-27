/**
 * Constantes de tipos de impuestos soportados
 */
export enum TAX_TYPES {
  IVA = "IVA",
  ISR = "ISR",
  IEPS = "IEPS",
  CUSTOM = "CUSTOM",
}

/**
 * Porcentajes de impuestos predeterminados
 */
export const DEFAULT_TAX_PERCENTAGES: Record<string, number> = {
  IVA: 16,
  ISR: 10,
  IEPS: 0,
};

/**
 * Configuración de validación de impuestos
 */
export const TAX_VALIDATION = {
  MIN_PERCENTAGE: 0,
  MAX_PERCENTAGE: 100,
  DECIMAL_PLACES: 2,
} as const;

/**
 * Mensajes de error de impuestos
 */
export const TAX_ERROR_MESSAGES = {
  INVALID_PERCENTAGE:
    "El porcentaje de impuesto debe estar entre 0 y 100",
  INVALID_NAME: "El nombre del impuesto no puede estar vacío",
  TAX_NOT_FOUND: "El impuesto no fue encontrado",
  DUPLICATE_TAX: "El impuesto ya existe",
} as const;

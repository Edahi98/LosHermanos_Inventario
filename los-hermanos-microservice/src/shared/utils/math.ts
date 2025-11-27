/**
 * Redondea un número a 2 decimales
 * @param value - Valor a redondear
 * @returns Valor redondeado a 2 decimales
 */
export function roundToTwoDecimals(value: number): number {
  return parseFloat(value.toFixed(2));
}

/**
 * Calcula el precio total sin impuestos
 * @param price - Precio unitario
 * @param quantity - Cantidad
 * @returns Precio total sin impuestos
 */
export function calculateSubtotal(price: number, quantity: number): number {
  return roundToTwoDecimals(price * quantity);
}

/**
 * Calcula el monto del impuesto
 * @param baseAmount - Cantidad base a la que se aplica el impuesto
 * @param taxPercentage - Porcentaje del impuesto
 * @returns Monto del impuesto
 */
export function calculateTaxAmount(
  baseAmount: number,
  taxPercentage: number
): number {
  return roundToTwoDecimals((baseAmount * taxPercentage) / 100);
}

/**
 * Calcula el multiplicador total de impuestos
 * @param taxPercentages - Array de porcentajes de impuestos
 * @returns Multiplicador total
 */
export function calculateTaxMultiplier(taxPercentages: number[]): number {
  const totalTaxPercentage = taxPercentages.reduce((sum, tax) => sum + tax, 0);
  return 1 + totalTaxPercentage / 100;
}

/**
 * Calcula el precio final con impuestos
 * @param basePrice - Precio base
 * @param taxPercentages - Array de porcentajes de impuestos
 * @returns Precio final con impuestos incluidos
 */
export function calculateFinalPrice(
  basePrice: number,
  taxPercentages: number[]
): number {
  const multiplier = calculateTaxMultiplier(taxPercentages);
  return roundToTwoDecimals(basePrice * multiplier);
}

/**
 * Calcula el desglose de impuestos
 * @param baseAmount - Cantidad base
 * @param taxPercentages - Array de porcentajes con sus nombres
 * @returns Objeto con el desglose de impuestos
 */
export function calculateTaxBreakdown(
  baseAmount: number,
  taxPercentages: Array<{ name: string; percentage: number }>
): Record<string, number> {
  const breakdown: Record<string, number> = {};
  taxPercentages.forEach((tax) => {
    breakdown[tax.name] = calculateTaxAmount(baseAmount, tax.percentage);
  });
  return breakdown;
}

/**
 * Valida que un porcentaje esté dentro del rango válido
 * @param percentage - Porcentaje a validar
   * @param minValue - Valor mínimo (por defecto 0)
 * @param maxValue - Valor máximo (por defecto 100)
 * @returns true si es válido, false en caso contrario
 */
export function isValidPercentage(
  percentage: number,
  minValue: number = 0,
  maxValue: number = 100
): boolean {
  return percentage >= minValue && percentage <= maxValue;
}

/**
 * Verifica si un número es válido para cálculos de precio
 * @param value - Valor a verificar
 * @returns true si es un número positivo válido
 */
export function isValidPrice(value: number): boolean {
  return typeof value === "number" && value >= 0 && isFinite(value);
}

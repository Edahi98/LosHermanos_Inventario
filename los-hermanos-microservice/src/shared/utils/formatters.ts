/**
 * Formatea un número a formato de moneda
 */
export function formatCurrency(value: number, currency: string = "USD"): string {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

/**
 * Formatea un número a formato de porcentaje
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formatea una fecha
 */
export function formatDate(date: Date, locale: string = "es-MX"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

/**
 * Formatea una fecha corta (sin hora)
 */
export function formatDateShort(date: Date, locale: string = "es-MX"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * Formatea un número con separadores de miles
 */
export function formatNumber(value: number, decimals: number = 0): string {
  const formatter = new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return formatter.format(value);
}

/**
 * Convierte un objeto a un string formateado para logging
 */
export function formatObject(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, 2);
}

/**
 * Limpia y valida una cadena de texto
 */
export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

/**
 * Genera un ID único
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convierte un string a formato Title Case
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Máscara de teléfono
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export default {
  formatCurrency,
  formatPercentage,
  formatDate,
  formatDateShort,
  formatNumber,
  formatObject,
  sanitizeString,
  generateUniqueId,
  toTitleCase,
  isValidEmail,
  formatPhoneNumber,
};

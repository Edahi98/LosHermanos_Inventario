export class TaxError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "TaxError";
  }
}

export class InvalidTaxPercentageError extends TaxError {
  constructor(percentage: number, min: number = 0, max: number = 100) {
    super(
      "INVALID_TAX_PERCENTAGE",
      400,
      `Porcentaje de impuesto inválido: ${percentage}. Debe estar entre ${min} y ${max}`,
    );
  }
}

export class TaxNotFoundError extends TaxError {
  constructor(taxId: number) {
    super("TAX_NOT_FOUND", 404, `Impuesto con ID ${taxId} no encontrado`);
  }
}

export class DuplicateTaxNameError extends TaxError {
  constructor(name: string) {
    super(
      "DUPLICATE_TAX_NAME",
      409,
      `Un impuesto con el nombre "${name}" ya existe`,
    );
  }
}

export class InvalidTaxNameError extends TaxError {
  constructor(name: string) {
    super("INVALID_TAX_NAME", 400, `Nombre de impuesto inválido: "${name}"`);
  }
}

export class EmptyTaxConfigError extends TaxError {
  constructor() {
    super(
      "EMPTY_TAX_CONFIG",
      400,
      "No hay impuestos configurados en el builder",
    );
  }
}

export class InvalidTaxCalculationError extends TaxError {
  constructor(basePrice: number, taxes: string) {
    super(
      "INVALID_TAX_CALCULATION",
      400,
      `Error al calcular impuestos para precio base: ${basePrice}. Impuestos: ${taxes}`,
    );
  }
}

export class TaxDeletionError extends TaxError {
  constructor(taxId: number) {
    super(
      "TAX_DELETION_ERROR",
      400,
      `No se puede eliminar el impuesto ${taxId} porque está siendo utilizado`,
    );
  }
}

export class TaxUpdateError extends TaxError {
  constructor(taxId: number, message: string) {
    super(
      "TAX_UPDATE_ERROR",
      400,
      `Error al actualizar impuesto ${taxId}: ${message}`,
    );
  }
}

export class TaxCalculationOverflowError extends TaxError {
  constructor(totalPercentage: number) {
    super(
      "TAX_OVERFLOW",
      400,
      `El total de impuestos (${totalPercentage}%) excede el límite permitido (500%)`,
    );
  }
}

export function isTaxError(error: unknown): error is TaxError {
  return error instanceof TaxError;
}

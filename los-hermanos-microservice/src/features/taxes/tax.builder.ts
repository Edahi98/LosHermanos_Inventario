export interface TaxConfig {
  name: string;
  percentage: number;
  enabled: boolean;
}

/**
 * TaxBuilder implementa el patrón Builder para construir configuraciones de impuestos
 * Permite agregar, modificar y calcular impuestos de forma fluida
 */
export class TaxBuilder {
  private taxes: Map<string, TaxConfig> = new Map();
  private ivaPercentage: number = 0;
  private isrPercentage: number = 0;
  private otherTaxes: Map<string, TaxConfig> = new Map();

  constructor() {
    // Constructor vacío
  }

  /**
   * Agrega y establece el IVA (Impuesto al Valor Agregado)
   * @param percentage - Porcentaje del IVA (por defecto 16%)
   * @returns this para encadenamiento de métodos
   */
  public addIva(percentage: number = 16): this {
    this.validatePercentage(percentage);
    this.ivaPercentage = percentage;
    this.taxes.set("IVA", {
      name: "IVA",
      percentage,
      enabled: true,
    });
    return this;
  }

  /**
   * Establece el IVA de forma explícita
   * @param percentage - Porcentaje del IVA
   * @returns this para encadenamiento de métodos
   */
  public setIva(percentage: number): this {
    this.validatePercentage(percentage);
    this.ivaPercentage = percentage;
    this.taxes.set("IVA", {
      name: "IVA",
      percentage,
      enabled: true,
    });
    return this;
  }

  /**
   * Remueve el IVA
   * @returns this para encadenamiento de métodos
   */
  public removeIva(): this {
    this.ivaPercentage = 0;
    this.taxes.delete("IVA");
    return this;
  }

  /**
   * Agrega y establece el ISR (Impuesto Sobre la Renta)
   * @param percentage - Porcentaje del ISR
   * @returns this para encadenamiento de métodos
   */
  public addISR(percentage: number = 10): this {
    this.validatePercentage(percentage);
    this.isrPercentage = percentage;
    this.taxes.set("ISR", {
      name: "ISR",
      percentage,
      enabled: true,
    });
    return this;
  }

  /**
   * Establece el ISR de forma explícita
   * @param percentage - Porcentaje del ISR
   * @returns this para encadenamiento de métodos
   */
  public setISR(percentage: number): this {
    this.validatePercentage(percentage);
    this.isrPercentage = percentage;
    this.taxes.set("ISR", {
      name: "ISR",
      percentage,
      enabled: true,
    });
    return this;
  }

  /**
   * Remueve el ISR
   * @returns this para encadenamiento de métodos
   */
  public removeISR(): this {
    this.isrPercentage = 0;
    this.taxes.delete("ISR");
    return this;
  }

  /**
   * Agrega un impuesto personalizado
   * @param name - Nombre del impuesto
   * @param percentage - Porcentaje del impuesto
   * @returns this para encadenamiento de métodos
   */
  public addCustomTax(name: string, percentage: number): this {
    this.validatePercentage(percentage);
    if (!name || name.trim() === "") {
      throw new Error("El nombre del impuesto no puede estar vacío");
    }
    this.otherTaxes.set(name, {
      name,
      percentage,
      enabled: true,
    });
    this.taxes.set(name, {
      name,
      percentage,
      enabled: true,
    });
    return this;
  }

  /**
   * Establece un impuesto personalizado
   * @param name - Nombre del impuesto
   * @param percentage - Porcentaje del impuesto
   * @returns this para encadenamiento de métodos
   */
  public setCustomTax(name: string, percentage: number): this {
    return this.addCustomTax(name, percentage);
  }

  /**
   * Remueve un impuesto personalizado
   * @param name - Nombre del impuesto a remover
   * @returns this para encadenamiento de métodos
   */
  public removeCustomTax(name: string): this {
    this.otherTaxes.delete(name);
    this.taxes.delete(name);
    return this;
  }

  /**
   * Habilita un impuesto existente
   * @param name - Nombre del impuesto
   * @returns this para encadenamiento de métodos
   */
  public enableTax(name: string): this {
    const tax = this.taxes.get(name);
    if (tax) {
      tax.enabled = true;
    }
    return this;
  }

  /**
   * Deshabilita un impuesto existente
   * @param name - Nombre del impuesto
   * @returns this para encadenamiento de métodos
   */
  public disableTax(name: string): this {
    const tax = this.taxes.get(name);
    if (tax) {
      tax.enabled = false;
    }
    return this;
  }

  /**
   * Calcula el multiplicador total de impuestos basado en los impuestos habilitados
   * @returns Multiplicador total (ej: 1.26 para 26%)
   */
  public calculateTaxMultiplier(): number {
    let totalPercentage = 0;
    this.taxes.forEach((tax: TaxConfig) => {
      if (tax.enabled) {
        totalPercentage += tax.percentage;
      }
    });
    return 1 + totalPercentage / 100;
  }

  /**
   * Obtiene el porcentaje total de impuestos
   * @returns Porcentaje total de impuestos
   */
  public getTotalTaxPercentage(): number {
    let totalPercentage = 0;
    this.taxes.forEach((tax: TaxConfig) => {
      if (tax.enabled) {
        totalPercentage += tax.percentage;
      }
    });
    return totalPercentage;
  }

  /**
   * Obtiene la configuración de un impuesto específico
   * @param name - Nombre del impuesto
   * @returns Configuración del impuesto o undefined
   */
  public getTax(name: string): TaxConfig | undefined {
    return this.taxes.get(name);
  }

  /**
   * Obtiene todos los impuestos configurados
   * @returns Array con todos los impuestos
   */
  public getAllTaxes(): TaxConfig[] {
    return Array.from(this.taxes.values());
  }

  /**
   * Obtiene todos los impuestos habilitados
   * @returns Array con solo los impuestos habilitados
   */
  public getEnabledTaxes(): TaxConfig[] {
    return Array.from(this.taxes.values()).filter(
      (tax: TaxConfig) => tax.enabled
    );
  }

  /**
   * Verifica si existe un impuesto
   * @param name - Nombre del impuesto
   * @returns true si existe, false en caso contrario
   */
  public hasTax(name: string): boolean {
    return this.taxes.has(name);
  }

  /**
   * Resetea el builder al estado inicial (sin impuestos)
   * @returns this para encadenamiento de métodos
   */
  public reset(): this {
    this.taxes = new Map();
    this.ivaPercentage = 0;
    this.isrPercentage = 0;
    this.otherTaxes = new Map();
    return this;
  }

  /**
   * Construye y devuelve la configuración de impuestos
   * @returns Objeto con la configuración final de impuestos
   */
  public build(): Record<string, unknown> {
    return {
      taxes: this.getAllTaxes(),
      totalPercentage: this.getTotalTaxPercentage(),
      taxMultiplier: this.calculateTaxMultiplier(),
    };
  }

  /**
   * Valida que el porcentaje esté entre 0 y 100
   * @param percentage - Porcentaje a validar
   * @throws Error si el porcentaje no es válido
   */
  private validatePercentage(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error(
        "El porcentaje de impuesto debe estar entre 0 y 100"
      );
    }
  }
}

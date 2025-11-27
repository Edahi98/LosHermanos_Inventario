import { BaseBuilder } from "./base.builder.ts";
import { TaxBuilder } from "../../src/features/taxes/tax.builder.ts";

interface Tax {
  name: string;
  percentage: number;
}

export class PriceBuilder extends BaseBuilder<number> {
  private taxes: Tax[] = [];
  private basePrice: number;
  private taxBuilder: TaxBuilder;

  constructor(basePrice: number) {
    super(basePrice);
    this.basePrice = basePrice;
    this.taxBuilder = new TaxBuilder();
  }

  /**
   * Agrega el IVA a través del TaxBuilder
   * @param percentage - Porcentaje del IVA (por defecto 16%)
   * @returns this para encadenamiento de métodos
   */
  public addIva(percentage: number = 16): this {
    this.taxBuilder.addIva(percentage);
    this.taxes.push({ name: "IVA", percentage });
    return this;
  }

  /**
   * Agrega un impuesto personalizado
   * @param name - Nombre del impuesto
   * @param percentage - Porcentaje del impuesto
   * @returns this para encadenamiento de métodos
   */
  public addTax(name: string, percentage: number): this {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Tax percentage must be between 0 and 100.");
    }
    this.taxBuilder.addCustomTax(name, percentage);
    this.taxes.push({ name, percentage });
    return this;
  }

  /**
   * Agrega el ISR
   * @param percentage - Porcentaje del ISR
   * @returns this para encadenamiento de métodos
   */
  public addISR(percentage: number = 10): this {
    this.taxBuilder.addISR(percentage);
    this.taxes.push({ name: "ISR", percentage });
    return this;
  }

  /**
   * Obtiene el TaxBuilder para operaciones más complejas
   * @returns El TaxBuilder configurado
   */
  public getTaxBuilder(): TaxBuilder {
    return this.taxBuilder;
  }

  /**
   * Resetea el builder
   * @returns this para encadenamiento de métodos
   */
  public reset(): this {
    this.taxes = [];
    this.taxBuilder.reset();
    return this;
  }

  /**
   * Construye y calcula el precio final con impuestos
   * @returns Precio final con impuestos aplicados
   */
  public build(): number {
    const taxMultiplier = this.taxBuilder.calculateTaxMultiplier();
    const finalPrice = this.basePrice * taxMultiplier;
    return parseFloat(finalPrice.toFixed(2));
  }

  /**
   * Método adicional para obtener un objeto completo con todos los detalles
   * @returns Objeto con detalles del precio y impuestos
   */
  public buildComplete(): Record<string, unknown> {
    const finalPrice = this.build();
    const taxConfig = this.taxBuilder.build();
    return {
      basePrice: this.basePrice,
      finalPrice,
      ...taxConfig,
    };
  }
}

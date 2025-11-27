export abstract class BaseBuilder<T> {
  public object: T;

  constructor(object: T) {
    this.object = object;
  }

  /**
   * Método abstracto que debe ser implementado por las subclases
   * para construir y devolver el objeto final
   */
  abstract build(): T | Record<string, unknown>;

  /**
   * Método para resetear el builder a su estado inicial
   */
  abstract reset(): this;
}

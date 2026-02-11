// src/domain/purchase/purchaseEntity.ts

export class Purchase {
  /**
   * @param id Identificador único de la compra (por ejemplo 'global' si es una sola cuenta)
   * @param timestamp Timestamp en milisegundos de cuándo se realizó la compra
   * @param value Valor que se compró (opcional, útil para tracking)
   */
  constructor(
    public id: string,
    public timestamp: number,
    public value?: number
  ) {}

  // Puedes agregar métodos de utilidad en la entidad si quieres
  isWithinLastMinute(referenceTime: number = Date.now()): boolean {
    return referenceTime - this.timestamp < 60_000; // 60 segundos
  }
}

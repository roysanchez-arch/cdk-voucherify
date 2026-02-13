// domain/model/Purchase.ts

export type PurchaseType = "AUTOMATICO";
export type PurchaseStatus = "SUCCESS" | "SKIPPED";

export class Purchase {
  constructor(
    public readonly id: string,
    public readonly correlationId: string,
    public readonly voucherifyPercentage: number,
    public readonly timestamp: number,
    public readonly createdAt: string,
    public readonly purchaseType: PurchaseType,
    public readonly status: PurchaseStatus
  ) {}

  static create(params: {
    id: string;
    correlationId: string;
    voucherifyPercentage: number;
    purchaseType: PurchaseType;
  }): Purchase {
    const now = Date.now();

    return new Purchase(
      params.id,
      params.correlationId,
      params.voucherifyPercentage,
      now,
      new Date(now).toISOString(),
      params.purchaseType,
      "SUCCESS"
    );
  }
}
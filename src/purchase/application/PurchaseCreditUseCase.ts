// application/usecase/PurchaseCreditUseCase.ts

import { randomUUID } from "crypto";
import { Purchase } from "../domain/model/Purchase";
import { PurchaseRepository } from "../domain/repository/PurchaseRepository";

export class PurchaseCreditUseCase {
  constructor(
    private readonly repository: PurchaseRepository
  ) {}

  async execute(params: {
    triggerPercentage: number;
    correlationId: string;
  }) {

    const now = Date.now();
    const lastPurchase = await this.repository.getLastPurchase();

    const FIVE_MINUTES = 5 * 60 * 1000;

    if (lastPurchase && (now - lastPurchase.timestamp) < FIVE_MINUTES) {
      return {
        status: "SKIPPED",
        reason: "Purchase already executed within last 5 minutes"
      };
    }

    const purchase = Purchase.create({
      id: randomUUID(),
      correlationId: params.correlationId,
      triggerPercentage: params.triggerPercentage,
      purchaseType: "AUTOMATICO"
    });

    await this.repository.save(purchase);

    return {
      status: "SUCCESS",
      id: purchase.id
    };
  }
}
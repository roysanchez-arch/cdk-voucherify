import { Purchase } from "../domain/model/Purchase";
import { PurchasePolicy } from "../domain/model/PurchasePolicy";
import { PurchaseRepository } from "../domain/port/PurchaseRepository";


export class PurchaseCreditUseCase {


    constructor(
        private readonly repository: PurchaseRepository
    ) {}

  async execute(validatedValue: number) {
    const now = Date.now();

    const lastPurchase = await this.repository.getLastPurchase();

    const canPurchase = PurchasePolicy.canPurchase(
      lastPurchase?.timestamp ?? null,
      now
    );

    if (!canPurchase) {
      return {
        status: "SKIPPED",
        reason: "Purchase already executed within last 5 minutes"
      };
    }

    const purchase = new Purchase(crypto.randomUUID(), now);
    await this.repository.save(purchase);

    return {
      status: "SUCCESS"
    };
  }

}
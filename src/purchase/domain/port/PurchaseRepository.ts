import { Purchase } from "../model/Purchase";

export interface PurchaseRepository {
  getLastPurchase(): Promise<Purchase | null>;
  save(purchase: Purchase): Promise<void>;
}

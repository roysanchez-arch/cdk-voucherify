export class PurchasePolicy {
  private static FIVE_MINUTES = 5 * 60 * 1000;

  static canPurchase(lastPurchaseTimestamp: number | null, now: number): boolean {
    if (!lastPurchaseTimestamp) return true;

    const diff = now - lastPurchaseTimestamp;
    return diff > this.FIVE_MINUTES;
  }
}

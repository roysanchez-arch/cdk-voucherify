import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { Purchase } from "../../domain/model/Purchase";
import { PurchaseRepository } from "../../domain/port/PurchaseRepository";

export class DynamoPurchaseRepository implements PurchaseRepository {
  private readonly tableName = process.env.PURCHASE_TABLE!;
  private readonly client = DynamoDBDocumentClient.from(
    new DynamoDBClient({})
  );

  async getLastPurchase(): Promise<Purchase | null> {
    const result = await this.client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": "PURCHASE"
        },
        ScanIndexForward: false,
        Limit: 1
      })
    );

    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    const item = result.Items[0];

    return new Purchase(item.id, item.timestamp);
  }

  async save(purchase: Purchase): Promise<void> {
    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          pk: "PURCHASE",
          sk: purchase.timestamp,
          id: purchase.id,
          timestamp: purchase.timestamp
        }
      })
    );
  }
}
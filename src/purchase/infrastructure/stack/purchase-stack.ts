import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class PurchaseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB
    const purchaseTable = new dynamodb.Table(this, 'PurchaseTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda
    const purchaseLambda = new lambda.Function(this, 'PurchaseLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'purchaseLambdaHandler.handler',
      code: lambda.Code.fromAsset('src/infrastructure/lambda'),
      environment: {
        PURCHASES_TABLE: purchaseTable.tableName,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
      },
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
    });

    purchaseTable.grantReadWriteData(purchaseLambda);

    // API Gateway HTTP endpoint para Cypress
    const api = new apigateway.RestApi(this, 'PurchaseApi', {
      restApiName: 'Purchase Service',
      description: 'API para disparar compra desde Cypress',
    });

    const purchaseIntegration = new apigateway.LambdaIntegration(purchaseLambda);

    api.root.addResource('buy').addMethod('POST', purchaseIntegration); // POST /buy
  }
}

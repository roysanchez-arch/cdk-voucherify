import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class PurchaseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB
    const purchaseTable = new dynamodb.Table(this, 'PurchaseTable', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.NUMBER },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda
    const purchaseLambda = new lambdaNodejs.NodejsFunction(this, 'PurchaseLambda', {
      entry: path.join(process.cwd(),"src/purchase/infrastructure/lambda/handler.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      bundling: { minify: true, externalModules: ["aws-sdk"] },
      timeout: cdk.Duration.seconds(30),
      environment: {
        PURCHASES_TABLE: purchaseTable.tableName
      }
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

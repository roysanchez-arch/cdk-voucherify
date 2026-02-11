#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { GithubLambdaStack } from '../monitor/infrastructure/stack/github-lambda-stack'; 
import { PurchaseStack } from '../purchase/infrastructure/stack/purchase-stack';

const app = new cdk.App();
new GithubLambdaStack(app, 'GithubLambdaStack');
new PurchaseStack(app, 'PurchaseStack');

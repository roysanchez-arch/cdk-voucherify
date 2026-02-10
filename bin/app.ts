#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { GithubLambdaStack } from '../stack/github-lambda-stack';

const app = new cdk.App();
new GithubLambdaStack(app, 'GithubLambdaStack');

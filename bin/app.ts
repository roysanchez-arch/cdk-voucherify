#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { GithubLambdaStack } from '../lib/github-lambda-stack';

const app = new cdk.App();
new GithubLambdaStack(app, 'GithubLambdaStack');

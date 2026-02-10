import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";

export class GithubLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambdaNodejs.NodejsFunction(this, "GithubDispatchLambda", {
      entry: "src/infrastructure/lambda/handler.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      bundling: { minify: true, externalModules: ["aws-sdk"] },
      timeout: cdk.Duration.seconds(30),
      environment: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
        REPO_OWNER: "TU_OWNER",
        REPO_NAME: "TU_REPO",
        WORKFLOW_FILE: "cypress-monitor.yml",
        BRANCH: "main",
      },
    });

    // EventBridge cron
    const rule = new events.Rule(this, "ScheduleRule", {
      schedule: events.Schedule.expression("rate(1 minute)"),
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFunction));
  }
}
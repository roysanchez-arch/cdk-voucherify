import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as path from "path";
import { GithubConfig } from "./github-lambda-stack-config-env";


export class GithubLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const githubConfig = new GithubConfig(this, "GithubConfig", {
      basePath: "/cuida/voucherify/monitor/github",
    });

    const lambdaFunction = new lambdaNodejs.NodejsFunction(this, "GithubDispatchLambda", {
      entry: path.join(process.cwd(),"src/infrastructure/lambda/handler.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      bundling: { minify: true, externalModules: ["aws-sdk"] },
      timeout: cdk.Duration.seconds(30),
      environment: {
          REPO_OWNER: githubConfig.repoOwner,
          REPO_NAME: githubConfig.repoName,
          WORKFLOW_FILE: githubConfig.workflowFile,
          BRANCH: githubConfig.branch,
          GITHUB_TOKEN: githubConfig.token,
        },
    });

    // EventBridge cron
    const rule = new events.Rule(this, "ScheduleRule", {
      schedule: events.Schedule.expression("rate(10 minutes)"),
      enabled: false,
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFunction));
  }
}
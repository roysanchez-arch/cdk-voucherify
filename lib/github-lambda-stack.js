"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubLambdaStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const lambdaNodejs = __importStar(require("aws-cdk-lib/aws-lambda-nodejs"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const events = __importStar(require("aws-cdk-lib/aws-events"));
const targets = __importStar(require("aws-cdk-lib/aws-events-targets"));
class GithubLambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
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
exports.GithubLambdaStack = GithubLambdaStack;

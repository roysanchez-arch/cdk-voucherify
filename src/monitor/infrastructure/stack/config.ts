import { Construct } from "constructs";
import * as ssm from "aws-cdk-lib/aws-ssm";

export interface GithubConfigProps {
  basePath: string;
}

export class GithubConfig extends Construct {
  readonly repoOwner: string;
  readonly repoName: string;
  readonly workflowFile: string;
  readonly branch: string;
  readonly token: string;

  constructor(scope: Construct, id: string, props: GithubConfigProps) {
    super(scope, id);

    const p = (name: string) =>
      ssm.StringParameter.fromStringParameterName(
        this,
        name,
        `${props.basePath}/${name}`
      ).stringValue;

    this.repoOwner = p("repo_owner");
    this.repoName = p("repo_name");
    this.workflowFile = p("workflow_file");
    this.branch = p("branch");
    this.token = p("token");
  }
}

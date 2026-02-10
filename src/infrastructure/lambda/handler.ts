import { ExecutePipelineUseCase } from "../../application/ExecutePipelineUseCase";
import { GitHubApiParams } from "../../domain/model/GitHubApiParams";
import { GithubAxiosAdapter } from "../repository/GithubAxiosAdapter";

const githubApi = new GithubAxiosAdapter();
const useCase = new ExecutePipelineUseCase(githubApi);

export const handler = async () => {
  const params: GitHubApiParams = {
    owner: process.env.REPO_OWNER!,
    repo: process.env.REPO_NAME!,
    workflowFile: process.env.WORKFLOW_FILE!,
    branch: process.env.BRANCH || "main",
    token: process.env.GITHUB_TOKEN!,
  };
  console.log("Dispatching workflow with params:", params);
  await useCase.execute(params);
};
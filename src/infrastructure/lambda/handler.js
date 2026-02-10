"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const ExecutePipelineUseCase_1 = require("../../application/ExecutePipelineUseCase");
const GithubAxiosAdapter_1 = require("../repository/GithubAxiosAdapter");
const githubApi = new GithubAxiosAdapter_1.GithubAxiosAdapter();
const useCase = new ExecutePipelineUseCase_1.ExecutePipelineUseCase(githubApi);
const handler = async () => {
    const params = {
        owner: process.env.REPO_OWNER,
        repo: process.env.REPO_NAME,
        workflowFile: process.env.WORKFLOW_FILE,
        branch: process.env.BRANCH || "main",
        token: process.env.GITHUB_TOKEN,
    };
    console.log("Dispatching workflow with params:", params);
    await useCase.execute(params);
};
exports.handler = handler;

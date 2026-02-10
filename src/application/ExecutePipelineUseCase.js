"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutePipelineUseCase = void 0;
class ExecutePipelineUseCase {
    constructor(githubApi) {
        this.githubApi = githubApi;
    }
    async execute(params) {
        try {
            await this.githubApi.executePipelineMonitor(params);
            //this.logger.log(`Workflow dispatched successfully for ${params.workflowFile}`);
        }
        catch (error) {
            //this.logger.error(`Failed to dispatch workflow: ${error.message}`);
        }
    }
}
exports.ExecutePipelineUseCase = ExecutePipelineUseCase;

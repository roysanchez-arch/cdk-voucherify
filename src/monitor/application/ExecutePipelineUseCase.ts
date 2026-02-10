import { GithubApiRepository } from "../domain/repository/GithubApiRepository";
import { GitHubApiParams } from "../domain/model/GitHubApiParams";


export class ExecutePipelineUseCase {

  constructor(
    private githubApi: GithubApiRepository
  ) {}

  async execute(params: GitHubApiParams) {

    try {
      await this.githubApi.executePipelineMonitor(params);
      //this.logger.log(`Workflow dispatched successfully for ${params.workflowFile}`);
    } catch (error: any) {
      //this.logger.error(`Failed to dispatch workflow: ${error.message}`);
    }
    
  }

}
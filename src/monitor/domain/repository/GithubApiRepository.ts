import { GitHubApiParams } from "../model/GitHubApiParams";

export interface GithubApiRepository {
  
  executePipelineMonitor(params: GitHubApiParams): Promise<void>;
  
}
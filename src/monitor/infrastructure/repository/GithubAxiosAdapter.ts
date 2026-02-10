
import axios from "axios";
import { GitHubApiParams } from "../../domain/model/GitHubApiParams";
import { GithubApiRepository } from "../../domain/repository/GithubApiRepository";

export class GithubAxiosAdapter implements GithubApiRepository {

    async executePipelineMonitor(params: GitHubApiParams): Promise<void> {
    
        const url = `https://api.github.com/repos/${params.owner}/${params.repo}/actions/workflows/${params.workflowFile}/dispatches`;

        try {
            await axios.post(
                url,
                { ref: params.branch },
                { headers: { Authorization: `Bearer ${params.token}`, Accept: "application/vnd.github+json" } }
            );
            } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
            }
        }

}
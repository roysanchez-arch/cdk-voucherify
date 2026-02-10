"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubAxiosAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
class GithubAxiosAdapter {
    async executePipelineMonitor(params) {
        const url = `https://api.github.com/repos/${params.owner}/${params.repo}/actions/workflows/${params.workflowFile}/dispatches`;
        try {
            await axios_1.default.post(url, { ref: params.branch }, { headers: { Authorization: `Bearer ${params.token}`, Accept: "application/vnd.github+json" } });
        }
        catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }
}
exports.GithubAxiosAdapter = GithubAxiosAdapter;

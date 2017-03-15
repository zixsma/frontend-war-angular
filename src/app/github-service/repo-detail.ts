export class RepoDetail {
    name: string;
    fullName: string;
    description: string;
    stargazersCount: number;
    forksCount: number;
    openIssuesCount: number;

    constructor(json?: {
        name?: string,
        description?: string,
        stargazers_count?: number,
        forks_count?: number,
        open_issues_count?: number,
        full_name?: string
    }) {
        if (!json) {return;}
        this.name = json.name;
        this.description = json.description;
        this.stargazersCount = json.stargazers_count;
        this.forksCount = json.forks_count;
        this.openIssuesCount = json.open_issues_count;
        this.fullName = json.full_name;
    }

}
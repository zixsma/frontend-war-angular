export class RepoDetail {
    name: string;
    fullName: string;
    stargazersCount: number;
    forksCount: number;
    openIssuesCount: number;

    constructor(json?: {
        name: string,
        full_name: string,
        stargazers_count: number,
        forks_count: number,
        open_issues_count: number
    }) {
        if (!json) {return;}
        this.name = json.name;
        this.fullName = json.full_name;
        this.stargazersCount = json.stargazers_count;
        this.forksCount = json.forks_count;
        this.openIssuesCount = json.open_issues_count;
    }

}
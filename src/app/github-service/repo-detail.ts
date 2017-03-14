export class RepoDetail {
    name: string;
    fullName: string;
    stargazersCount: number;
    forksCount: number;
    openIssuesCount: number;

    constructor({ name, full_name, stargazers_count, forks_count, open_issues_count }: {
        name: string,
        full_name: string,
        stargazers_count: number,
        forks_count: number,
        open_issues_count: number
    }) {
        this.name = name;
        this.fullName = full_name;
        this.stargazersCount = stargazers_count;
        this.forksCount = forks_count;
        this.openIssuesCount = open_issues_count;
    }

}
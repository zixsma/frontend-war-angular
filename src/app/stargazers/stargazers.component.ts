import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github-service/github.service';

@Component({
  selector: 'stargazers',
  templateUrl: './stargazers.component.html',
  styleUrls: ['./stargazers.component.scss']
})
export class StargazersComponent implements OnInit {
  stargazers: string[] = [];
  owner: string;
  repo: string;

  constructor(private activatedRoute: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ owner, repo }) => {
      this.owner = owner;
      this.repo = repo;
      if (owner && repo) {
        this.loadStargazers(owner, repo, 1);
      }
    });
  }

  private loadStargazers(owner: string, repo: string, page: number) {
    this.githubService.getStargazers(owner, repo, 1)
      .subscribe(stargazers => this.stargazers = this.stargazers = stargazers);
  }

}

import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github-service/github.service';

@Component({
  selector: 'stargazers',
  templateUrl: './stargazers.component.html',
  styleUrls: ['./stargazers.component.scss']
})
export class StargazersComponent implements OnInit {
  stargazers: string[] = [];
  private owner: string;
  private repo: string;

  constructor(private activatedRoute: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ owner, repo }) => {
      this.owner = owner;
      this.repo = repo;
      this.loadStargazers(1);
    });
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    this.loadStargazers(2);
  }

  private loadStargazers(page: number) {
    this.githubService.getStargazers(this.owner, this.repo, page)
      .subscribe(stargazers => this.stargazers = this.stargazers = stargazers);
  }

}

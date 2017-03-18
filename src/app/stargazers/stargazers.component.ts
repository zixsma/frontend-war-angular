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
  loading: boolean;
  private owner: string;
  private repo: string;
  private page: number;

  constructor(private activatedRoute: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ owner, repo }) => {
      this.owner = owner;
      this.repo = repo;
      this.page = 1;
      this.loadStargazers(this.page);
    });
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    let window = event.currentTarget;
    let document = event.target;
    if (this.loading) { return; }
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
      this.loadStargazers(this.page);
    }
  }

  private loadStargazers(page: number) {
    this.loading = true;
    this.githubService.getStargazers(this.owner, this.repo, page)
      .finally(() => { this.loading = false }).subscribe(stargazers => {
        this.stargazers = this.stargazers.concat(stargazers)
        this.page += 1;
      });
  }

}

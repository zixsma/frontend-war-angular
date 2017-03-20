import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService, RepoDetail } from '../shared/github-service/github.service';
import { SlideInUpAnimation } from '../shared/animations';

@Component({
  selector: 'stargazers',
  animations: [SlideInUpAnimation],
  styleUrls: ['./stargazers.component.css'],
  templateUrl: './stargazers.component.html'
})
export class StargazersComponent implements OnInit {
  stargazers: string[] = [];
  repoDetail = new RepoDetail();
  loading: boolean;
  private owner: string;
  private repo: string;
  private page = 1;
  private per_page = 24;

  constructor(private activatedRoute: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ owner, repo }) => {
      this.owner = owner;
      this.repo = repo;
      this.loadStargazers(this.page, this.per_page);
      this.githubService.getRepo(owner, repo).subscribe(repoDetail => this.repoDetail = repoDetail);
    });
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    let window = event.currentTarget;
    let document = event.target;
    if (this.loading) { return; }
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
      this.loadStargazers(this.page, this.per_page);
    }
  }

  private loadStargazers(page: number, per_page: number) {
    this.loading = true;
    this.githubService.getStargazers(this.owner, this.repo, page, per_page)
      .finally(() => { this.loading = false })
      .subscribe(stargazers => {
        this.stargazers = this.stargazers.concat(stargazers)
        this.page++;
      });
  }

}

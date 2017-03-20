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
  private perPage = 24;

  constructor(private activatedRoute: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ owner, repo }) => {
      this.owner = owner;
      this.repo = repo;
      this.loadStargazers(this.page, this.perPage);
      this.githubService.getRepo(owner, repo).subscribe(repoDetail => this.repoDetail = repoDetail);
    });
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    let window = event.currentTarget;
    let document = event.target;
    if (this.loading) { return; }
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
      this.loadStargazers(this.page, this.perPage);
    }
  }

  private loadStargazers(page: number, perPage: number) {
    this.loading = true;
    this.githubService.getStargazers(this.owner, this.repo, page, perPage)
      .finally(() => { this.loading = false })
      .subscribe(stargazers => {
        this.stargazers = this.stargazers.concat(stargazers)
        this.page++;
      });
  }

}

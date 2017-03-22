import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { GithubService, RepoDetail } from '../shared/github-service/github.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'poor-enemy-dashboard',
  templateUrl: './poor-enemy-dashboard.component.html'
})
export class PoorEnemyDashboardComponent implements OnChanges {
  @Input() owner: string;
  @Input() repo: string;
  @Input() btnClass: string;
  repoDetail = new RepoDetail();
  pullRequestCount: number;

  constructor(private githubService: GithubService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['owner'] || !changes['repo']) { return; }

    let owner = changes['owner'].currentValue;
    let repo = changes['repo'].currentValue;

    Observable.forkJoin(
      this.githubService.getRepo(owner, repo),
      this.githubService.getPullRequest(`${owner}/${repo}`)
    ).subscribe(([repoDetail, prCount]: [RepoDetail, number]) => {
      this.repoDetail = repoDetail;
      this.pullRequestCount = prCount;
    });
  }

}

import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { GithubService, RepoDetail } from '../github-service/github.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs';


@Component({
  selector: 'poor-enemy-dashboard',
  templateUrl: './poor-enemy-dashboard.component.html',
  styleUrls: ['./poor-enemy-dashboard.component.scss']
})
export class PoorEnemyDashboardComponent implements OnInit, OnChanges {
  @Input() owner: string;
  @Input() repo: string;
  repoDetail = new RepoDetail();
  pullRequestCount: number;
  constructor(private githubService: GithubService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['owner'] && changes['repo']) {
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

}

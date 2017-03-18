import { Component, OnInit } from '@angular/core';
import { GithubService, RepoDetail } from '../github-service/github.service';
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  repoDetail = new RepoDetail();
  pullRequestCount: number;

  constructor(private service: GithubService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.service.getRepo('angular', 'angular'),
      this.service.getPullRequest('angular/angular')
    ).subscribe(([repoDetail, prCount]: [RepoDetail, number]) => {
      this.repoDetail = repoDetail;
      this.pullRequestCount = prCount;
    });
  }

}

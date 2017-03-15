import { Component, OnInit } from '@angular/core';
import { GithubService, RepoDetail } from '../github-service/github.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  repoDetail = new RepoDetail();
  constructor(private service: GithubService) { }

  ngOnInit() {
    this.service.getRepo('angular', 'angular').subscribe(repoDetail => this.repoDetail = repoDetail);
  }

}

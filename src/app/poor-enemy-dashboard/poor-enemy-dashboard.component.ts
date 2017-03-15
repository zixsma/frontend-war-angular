import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { GithubService, RepoDetail } from '../github-service/github.service';

@Component({
  selector: 'poor-enemy-dashboard',
  templateUrl: './poor-enemy-dashboard.component.html',
  styleUrls: ['./poor-enemy-dashboard.component.scss']
})
export class PoorEnemyDashboardComponent implements OnInit, OnChanges {
  @Input() owner: string;
  @Input() repo: string;
  repoDetail = new RepoDetail();

  constructor(private githubService: GithubService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['owner'] && changes['repo']) {
      this.githubService.getRepo(changes['owner'].currentValue, changes['repo'].currentValue)
        .subscribe(repoDetail => this.repoDetail = repoDetail);
    }
  }

}

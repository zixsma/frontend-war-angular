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

  constructor(private activatedRoute: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({owner, repo}) => {
      if (owner && repo) {
        this.githubService.getStargazers(owner, repo, 1);
      }
    });
  }

}

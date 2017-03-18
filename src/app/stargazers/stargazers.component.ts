import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'stargazers',
  templateUrl: './stargazers.component.html',
  styleUrls: ['./stargazers.component.scss']
})
export class StargazersComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe();
  }

}

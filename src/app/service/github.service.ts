import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GithubService {

  constructor(private http: Http) { }

  getRepo(owner: string, repoName: string) {
    this.http.get(`https://api.github.com/repos/${owner}/${repoName}`);
  }

}

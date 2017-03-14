import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RepoDetail } from './repo-detail';
import 'rxjs/add/operator/map';

export { RepoDetail } from './repo-detail';

@Injectable()
export class GithubService {

  constructor(private http: Http) { }

  getRepo(owner: string, repoName: string) {
    return this.http.get(`https://api.github.com/repos/${owner}/${repoName}`)
      .map(response => new RepoDetail(response.json()));
  }

}

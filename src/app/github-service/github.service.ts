import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { RepoDetail } from './repo-detail';
import 'rxjs/add/operator/map';

export { RepoDetail } from './repo-detail';

@Injectable()
export class GithubService {

  constructor(private http: Http) { }

  getRepo(owner: string, repoName: string) {
    let header = new Headers();
    header.append('Accept', 'application/vnd.github.v3+json');
    return this.http.get(`https://api.github.com/repos/${owner}/${repoName}`, {headers: header})
      .map(response => new RepoDetail(response.json()));
  }

}

import { TestBed, inject } from '@angular/core/testing';

import { GithubService, RepoDetail } from './github.service';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('GithubService', () => {
  let service: GithubService;
  let http: Http;
  let mockBackend: MockBackend;
  beforeEach(() => {
    mockBackend = new MockBackend();
    http = new Http(mockBackend, new BaseRequestOptions());
    service = new GithubService(http);
  });

  describe('getRepo', () => {
    beforeEach(() => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(jsonRepoDetail)
        })));
      });
    });

    it('should call api /repos/facebook/react when owner facebook and repo react', () => {
      let header = new Headers();
      header.append('Accept', 'application/vnd.github.v3+json');
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('https://api.github.com/repos/facebook/react');
        expect(connection.request.method).toEqual(RequestMethod.Get);
        expect(connection.request.headers.toJSON()).toEqual(header.toJSON());
      });
      service.getRepo('facebook', 'react');
    });

    it('should call api /repos/angular/angular when owner angular and repo angular', () => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('https://api.github.com/repos/angular/angular');
        expect(connection.request.method).toEqual(RequestMethod.Get);
      });
      service.getRepo('angular', 'angular');
    });

    it('should return repo detail when get repo detail success', () => {
      service.getRepo('angular', 'angular').subscribe(repoDetail => {
        expect(repoDetail).toEqual(new RepoDetail(jsonRepoDetail));
      });
    });

    let jsonRepoDetail = {
      name: "angular",
      full_name: "angular/angular",
      stargazers_count: 21676,
      forks_count: 5568,
      open_issues_count: 1233
    };
  });
});

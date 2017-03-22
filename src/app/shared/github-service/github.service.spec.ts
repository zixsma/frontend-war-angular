import { TestBed, inject, async } from '@angular/core/testing';

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
      header.append('Authorization', 'token fbedabf134e561e8515b0c939d4f7b7b17f749ff');
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

  describe('get pull request', () => {
    beforeEach(() => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(getJsonPullRequest())
        })));
      });
    });

    it('should call api issues with repo full name angular/angular', (done) => {
      let header = new Headers();
      header.append('Accept', 'application/vnd.github.v3+json');
      header.append('Authorization', 'token fbedabf134e561e8515b0c939d4f7b7b17f749ff');
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('https://api.github.com/search/issues?q=+type:pr+repo:angular/angular&sort=created&‌​order=asc');
        expect(connection.request.method).toEqual(RequestMethod.Get);
        expect(connection.request.headers.toJSON()).toEqual(header.toJSON());
        done();
      });
      service.getPullRequest('angular/angular');
    });

    it('should call api issues with repo full name vuejs/vue-cli', (done) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('https://api.github.com/search/issues?q=+type:pr+repo:vuejs/vue-cli&sort=created&‌​order=asc');
        expect(connection.request.method).toEqual(RequestMethod.Get);
        done();
      });
      service.getPullRequest('vuejs/vue-cli');
    });

    it('should return pull request count when get pull request success', () => {
      service.getPullRequest('vuejs/vue-cli').subscribe(count => {
        expect(count).toEqual(5706);
      });
    });

    function getJsonPullRequest() {
      return { total_count: 5706 };
    }
  });

  describe('get pull request', () => {
    beforeEach(() => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(getJsonStargazers())
        })));
      });
    });

    it('should call get stargazers api with owner angular, repo angular, page size 30 and page 1', async(() => {
      let header = new Headers();
      header.append('Accept', 'application/vnd.github.v3+json');
      header.append('Authorization', 'token fbedabf134e561e8515b0c939d4f7b7b17f749ff');

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('https://api.github.com/repos/angular/angular/stargazers?page=1&per_page=30');
        expect(connection.request.method).toEqual(RequestMethod.Get);
        expect(connection.request.headers.toJSON()).toEqual(header.toJSON());
      });

      service.getStargazers('angular', 'angular', 1);
    }));

    it('should call get stargazers api with owner facebook, repo react, page size 30 and page 2', async(() => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('https://api.github.com/repos/facebook/react/stargazers?page=2&per_page=30');
        expect(connection.request.method).toEqual(RequestMethod.Get);
      });

      service.getStargazers('facebook', 'react', 2);
    }));

    it('should return stargazer image list when stargazers success', () => {
      service.getStargazers('angular', 'angular', 1).subscribe(stargazers => {
        expect(stargazers).toEqual([
          'https://avatars1.githubusercontent.com/u/463703?v=3',
          'https://avatars1.githubusercontent.com/u/644172?v=3'
        ]);
      });
    });

    function getJsonStargazers() {
      return [
        {
          avatar_url: 'https://avatars1.githubusercontent.com/u/463703?v=3'
        },
        {
          avatar_url: 'https://avatars1.githubusercontent.com/u/644172?v=3'
        }
      ];
    }
  });
});

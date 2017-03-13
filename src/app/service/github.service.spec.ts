import { TestBed, inject } from '@angular/core/testing';

import { GithubService } from './github.service';
import { Http, BaseRequestOptions } from '@angular/http';
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

  it('should call api /repos/facebook/react when call getRepo with owner facebook and repo react', () => {
    spyOn(http, 'get');
    service.getRepo('facebook', 'react');
    expect(http.get).toHaveBeenCalledWith('https://api.github.com/repos/facebook/react');
  });

  it('should call api /repos/angular/angular when call getRepo with owner angular and repo angular', () => {
    spyOn(http, 'get');
    service.getRepo('angular', 'angular');
    expect(http.get).toHaveBeenCalledWith('https://api.github.com/repos/angular/angular');
  });
});

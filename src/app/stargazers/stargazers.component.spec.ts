import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StargazersComponent } from './stargazers.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService } from '../github-service/github.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

class MockActivatedRoute extends ActivatedRoute {
  params = Observable.of({owner: 'angular', repo: 'angular'});
}

class MockHttp extends Http {

}

describe('StargazersComponent', () => {
  let component: StargazersComponent;
  let activatedRoute: MockActivatedRoute;
  let service: GithubService;

  beforeEach(() => {
    activatedRoute = new MockActivatedRoute();
    service = new GithubService(new Http(new MockBackend(), new BaseRequestOptions()));
    component = new StargazersComponent(activatedRoute, service);
  });

  it('should subscribe to ActivatedRoute params when init', () => {
    spyOn(activatedRoute.params, 'subscribe');
    component.ngOnInit();
    expect(activatedRoute.params.subscribe).toHaveBeenCalled();
  });

  it('should getStargazers with owner angular and repo angular when init', () => {
    spyOn(service, 'getStargazers');
    component.ngOnInit();
    expect(service.getStargazers).toHaveBeenCalledWith('angular', 'angular', 1);
  });

  it('should not getStargazers when init and has no owner and repo route params', () => {
    activatedRoute.params = Observable.of({});
    spyOn(service, 'getStargazers');
    component.ngOnInit();
    expect(service.getStargazers).not.toHaveBeenCalled();
  });
});

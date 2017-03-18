import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StargazersComponent } from './stargazers.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService, RepoDetail } from '../github-service/github.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

class MockActivatedRoute extends ActivatedRoute {
  params = Observable.of({ owner: 'angular', repo: 'angular' });
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

  it('should getStargazers with owner facebook and repo react when init', () => {
    expect(component.stargazers).toEqual([]);
  });

  it('should initial new repoDetail property', () => {
    expect(component.repoDetail).toEqual(new RepoDetail());
  });

  describe('getStargazers', () => {
    beforeEach(() => {
      spyOn(service, 'getStargazers').and.returnValue(Observable.of(['fake string of stargazer']));
    });

    it('should getStargazers with owner angular and repo angular when init', () => {
      component.ngOnInit();
      expect(service.getStargazers).toHaveBeenCalledWith('angular', 'angular', 1);
    });

    it('should getStargazers with owner facebook and repo react when init', () => {
      activatedRoute.params = Observable.of({ owner: 'facebook', repo: 'react' });
      component.ngOnInit();
      expect(service.getStargazers).toHaveBeenCalledWith('facebook', 'react', 1);
    });

    it('should set stargazers page 1 when getStargazers success', () => {
      component.ngOnInit();
      expect(component.stargazers).toEqual(['fake string of stargazer']);
    });
  });

  describe('scroll to bottom of page', () => {
    beforeEach(() => {
      spyOn(service, 'getStargazers').and.returnValue(Observable.of(['fake string of stargazer 2']));
    });

    it('should get stargazers page 2', () => {
      component.ngOnInit();
      component.onWindowScroll(getWindowEvent(600, 700));
      expect(service.getStargazers).toHaveBeenCalledWith('angular', 'angular', 2);
    });

    it('should get stargazers page 2', () => {
      component.onWindowScroll(getWindowEvent(599, 700));
      expect(service.getStargazers).not.toHaveBeenCalled();
    });

    it('should append stargazers when get stargazers page 2 success', () => {
      component.stargazers = ['fake string of stargazer 1'];
      component.onWindowScroll(getWindowEvent(600, 700));
      expect(component.stargazers).toEqual([
        'fake string of stargazer 1',
        'fake string of stargazer 2'
      ]);
    });

    it('should get stargazers page 3 when on page 2', () => {
      component.ngOnInit();
      component.onWindowScroll(getWindowEvent(600, 700));
      component.onWindowScroll(getWindowEvent(900, 1000));
      expect(service.getStargazers).toHaveBeenCalledWith('angular', 'angular', 3);
    });
  });

  describe('loading stargazers', () => {
    it('should set loading to true', () => {
      spyOn(service, 'getStargazers').and.returnValue(Observable.of(['fake string of stargazer']));
      component.loading = false;
      component.onWindowScroll(getWindowEvent(600, 700));
      component.loading = true;
    });

    it('should set loading to false when finish', () => {
      spyOn(service, 'getStargazers').and.returnValue(new Observable(observer => { observer.next(['fake string of stargazer']); observer.complete(); }));
      component.onWindowScroll(getWindowEvent(600, 700));
      component.loading = false;
    });

    it('should set loading to true when have not finished yet', () => {
      spyOn(service, 'getStargazers').and.returnValue(new Observable(observer => { observer.next(['fake string of stargazer']); }));
      component.onWindowScroll(getWindowEvent(600, 700));
      component.loading = true;
    });
  });

  describe('get repo detail', () => {
    let repoDetail: RepoDetail;
    beforeEach(() => {
      repoDetail = new RepoDetail({ name: 'angular' });
      spyOn(service, 'getRepo').and.returnValue(Observable.of(repoDetail));
    });
    it('should get with owner angular and repo angular when init', () => {
      component.ngOnInit();
      expect(service.getRepo).toHaveBeenCalledWith('angular', 'angular');
    });

    it('should get with owner facebook and repo react when init', () => {
      activatedRoute.params = Observable.of({ owner: 'facebook', repo: 'react' });
      component.ngOnInit();
      expect(service.getRepo).toHaveBeenCalledWith('facebook', 'react');
    });

    it('should set repo detail when get repo detail success', () => {
      component.ngOnInit();
      expect(component.repoDetail).toEqual(repoDetail);
    });
  });

  function getWindowEvent(scrollY: number, offsetHeight: number) {
    return {
      currentTarget: {
        innerHeight: 100,
        scrollY: scrollY
      },
      target: {
        body: {
          offsetHeight: offsetHeight
        }
      }
    };
  }

});

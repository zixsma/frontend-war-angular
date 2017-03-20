import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { PoorEnemyDashboardComponent } from '../poor-enemy-dashboard/poor-enemy-dashboard.component';
import { GithubService, RepoDetail } from '../shared/github-service/github.service';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: GithubService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, PoorEnemyDashboardComponent],
      providers: [GithubService, { provide: APP_BASE_HREF, useValue: "/" }],
      imports: [HttpModule, RouterModule.forRoot([]) ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GithubService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new repoDetail', () => {
    expect(component.repoDetail).toEqual(new RepoDetail());
  });

  describe('on init', () => {
    let repoDetail: RepoDetail;

    beforeEach(() => {
      repoDetail = getRepoDetail();
      spyOn(service, 'getRepo').and.returnValue(new Observable(observer => { observer.next(repoDetail); observer.complete(); }));
      spyOn(service, 'getPullRequest').and.returnValue(new Observable(observer => { observer.next(200); observer.complete(); }));
      component.ngOnInit();
    });

    it('should get angular repo detail from github service', () => {
      expect(service.getRepo).toHaveBeenCalledWith('angular', 'angular');
    });

    it('should set repoDetail when get repo detail success', () => {
      expect(component.repoDetail).toEqual(repoDetail);
    });

    it('should get pull request count from github service', () => {
      expect(service.getPullRequest).toHaveBeenCalledWith('angular/angular');
    });

    it('should set pullRequestCount when get pull request count success', () => {
      expect(component.pullRequestCount).toEqual(200);
    });

  });

  function getRepoDetail(): RepoDetail {
    return new RepoDetail({
      name: 'angular',
      description: 'One framework. Mobile & desktop.',
      stargazers_count: 21676,
      forks_count: 5568,
      open_issues_count: 1233
    });
  }
});

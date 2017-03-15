import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { PoorEnemyDashboardComponent } from './poor-enemy-dashboard.component';
import { GithubService, RepoDetail } from '../github-service/github.service';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('PoorEnemyDashboardComponent', () => {
  let component: PoorEnemyDashboardComponent;
  let fixture: ComponentFixture<PoorEnemyDashboardComponent>;
  let service: GithubService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PoorEnemyDashboardComponent],
      providers: [GithubService],
      imports: [HttpModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoorEnemyDashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GithubService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new repoDetail', () => {
    expect(component.repoDetail).toEqual(new RepoDetail());
  });

  describe('owner and repo input change', () => {
    let repoDetail: RepoDetail;

    beforeEach(() => {
      repoDetail = getRepoDetail();
      spyOn(service, 'getRepo').and.returnValue(new Observable(observer => observer.next(repoDetail)));
      component.ngOnChanges({
        owner: new SimpleChange('', 'angular'),
        repo: new SimpleChange('', 'angular')
      });
    });

    it('should get repo detail from github service', () => {
      expect(service.getRepo).toHaveBeenCalledWith('angular', 'angular');
    });

    it('should set repoDetail when get repo detail success', () => {
      expect(component.repoDetail).toEqual(repoDetail);
    });

  });

  it('should not get repo detail from github service when owner and repo input do not change', () => {
    spyOn(service, 'getRepo');
    component.ngOnChanges({});
    expect(service.getRepo).not.toHaveBeenCalled();
  });

  it('should not get repo detail from github service when only owner input change', () => {
    spyOn(service, 'getRepo');
    component.ngOnChanges({
      owner: new SimpleChange('', 'angular'),
    });
    expect(service.getRepo).not.toHaveBeenCalled();
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

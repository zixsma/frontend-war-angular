import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { PoorEnemyDashboardComponent } from './poor-enemy-dashboard.component';
import { GithubService } from '../github-service/github.service';
import { HttpModule } from '@angular/http';

describe('PoorEnemyDashboardComponent', () => {
  let component: PoorEnemyDashboardComponent;
  let fixture: ComponentFixture<PoorEnemyDashboardComponent>;
  let service: GithubService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoorEnemyDashboardComponent ],
      providers: [ GithubService ],
      imports: [ HttpModule ]
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
  
  it('should get repo detail from github service when owner and repo input change', () => {
    spyOn(service, 'getRepo');
    component.ngOnChanges({
      owner: new SimpleChange('', 'angular'),
      repo: new SimpleChange('', 'angular')
    });
    expect(service.getRepo).toHaveBeenCalledWith('angular', 'angular');
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

});

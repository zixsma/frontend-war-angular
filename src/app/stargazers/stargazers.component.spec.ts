import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StargazersComponent } from './stargazers.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

class MockActivatedRoute extends ActivatedRoute {
  params = Observable.of({owner: 'angular', repo: 'angular'});
}

describe('StargazersComponent', () => {
  let component: StargazersComponent;
  let activatedRoute: MockActivatedRoute;

  beforeEach(() => {
    activatedRoute = new MockActivatedRoute();
    component = new StargazersComponent(activatedRoute);
  });

  it('should subscribe to ActivatedRoute params when init', () => {
    spyOn(activatedRoute.params, 'subscribe');
    component.ngOnInit();
    expect(activatedRoute.params.subscribe).toHaveBeenCalled();
  });
});

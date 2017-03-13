import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoorEnemyDashboardComponent } from './poor-enemy-dashboard.component';

xdescribe('PoorEnemyDashboardComponent', () => {
  let component: PoorEnemyDashboardComponent;
  let fixture: ComponentFixture<PoorEnemyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoorEnemyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoorEnemyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

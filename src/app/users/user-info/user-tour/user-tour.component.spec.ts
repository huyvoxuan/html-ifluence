import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTourComponent } from './user-tour.component';

describe('UserTourComponent', () => {
  let component: UserTourComponent;
  let fixture: ComponentFixture<UserTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

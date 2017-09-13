import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoggedinComponent } from './user-loggedin.component';

describe('UserLoggedinComponent', () => {
  let component: UserLoggedinComponent;
  let fixture: ComponentFixture<UserLoggedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoggedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

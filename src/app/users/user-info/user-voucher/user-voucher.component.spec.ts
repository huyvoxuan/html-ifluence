import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVoucherComponent } from './user-voucher.component';

describe('UserVoucherComponent', () => {
  let component: UserVoucherComponent;
  let fixture: ComponentFixture<UserVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

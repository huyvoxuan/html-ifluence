import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourRegisteredComponent } from './tour-registered.component';

describe('TourRegisteredComponent', () => {
  let component: TourRegisteredComponent;
  let fixture: ComponentFixture<TourRegisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourRegisteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

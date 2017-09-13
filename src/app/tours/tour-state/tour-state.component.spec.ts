import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourStateComponent } from './tour-state.component';

describe('TourStateComponent', () => {
  let component: TourStateComponent;
  let fixture: ComponentFixture<TourStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDomesticComponent } from './tour-domestic.component';

describe('TourDomesticComponent', () => {
  let component: TourDomesticComponent;
  let fixture: ComponentFixture<TourDomesticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourDomesticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPromotionComponent } from './tour-promotion.component';

describe('TourPromotionComponent', () => {
  let component: TourPromotionComponent;
  let fixture: ComponentFixture<TourPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

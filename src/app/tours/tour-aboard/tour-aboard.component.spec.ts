import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourAboardComponent } from './tour-aboard.component';

describe('TourAboardComponent', () => {
  let component: TourAboardComponent;
  let fixture: ComponentFixture<TourAboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourAboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourAboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

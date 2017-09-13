import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAirlineComponent } from './service-airline.component';

describe('ServiceAirlineComponent', () => {
  let component: ServiceAirlineComponent;
  let fixture: ComponentFixture<ServiceAirlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAirlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

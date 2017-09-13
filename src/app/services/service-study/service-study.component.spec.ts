import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStudyComponent } from './service-study.component';

describe('ServiceStudyComponent', () => {
  let component: ServiceStudyComponent;
  let fixture: ComponentFixture<ServiceStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanticonsComponent } from './instanticons.component';

describe('InstanticonsComponent', () => {
  let component: InstanticonsComponent;
  let fixture: ComponentFixture<InstanticonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanticonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanticonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

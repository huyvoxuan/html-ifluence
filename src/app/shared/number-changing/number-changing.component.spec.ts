import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberChangingComponent } from './number-changing.component';

describe('NumberChangingComponent', () => {
  let component: NumberChangingComponent;
  let fixture: ComponentFixture<NumberChangingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberChangingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberChangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

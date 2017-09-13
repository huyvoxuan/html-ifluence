import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-changing',
  templateUrl: './number-changing.component.html',
  styleUrls: ['./number-changing.component.css']
})
export class NumberChangingComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() count: number;
  @Input() unit: number;
  @Input() minValue: number;
  @Output() output: EventEmitter<number>;
  public total: number;
  constructor() {
    this.output = new EventEmitter<number>();
    this.total = 0;
  }

  ngOnInit() {
    this.calculate();
  }
  calculate() {
    if (this.unit && this.unit !== null) {
      this.total = this.unit * this.count;
    }
  }
  increment() {
    this.count++;
    this.output.emit(this.count);
    this.calculate();
  }
  decrement() {
    if ((this.minValue && this.count > this.minValue) || (!this.minValue && this.count > 0) ) {
      this.count--;
      this.output.emit(this.count);
      this.calculate();
    }
  }
}

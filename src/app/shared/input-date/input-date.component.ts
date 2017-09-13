import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements OnInit {
  @Input() dateFormat: string;
  @Input() initDate: Date;
  @Input() placeHolder: string;
  @Input() icon: any;

  public showDatePicker = false;
  public showed = false;

  @Output() output: EventEmitter<Date>;

  @ViewChild('datepickerElement') datepickerElement: ElementRef;
  constructor() {
    this.output = new EventEmitter<Date>();
  }

  ngOnInit() {
  }
  /**
   * hide popup date piker
   */
  hideDatePicker() {
    /*if (!this.showed) {
      this.showed = true;
    } else {*/
      this.showDatePicker = false;
      /*this.showed = false;*/
      this.output.emit(this.initDate);
    /*}*/
  }
  /**
   * input date picker blur
   * hide if datepicker is showing
   */
  onBlur() {
  }
  onFocus() {
    this.showDatePicker = true;
  }
}

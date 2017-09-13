import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
@Component({
  selector: 'app-range-date',
  templateUrl: './range-date.component.html',
  styleUrls: ['./range-date.component.css']
})
export class RangeDateComponent implements OnInit {
  @Input() placeHolder: string;
  @Output() output: EventEmitter<Object>;
  constructor(private daterangepickerOptions: DaterangepickerConfig) {
    this.daterangepickerOptions.settings = {
      locale: { format: 'DD/MM/YYYY' }/*,
      alwaysShowCalendars: false*/
    };
    this.output = new EventEmitter<Object>();
  }

  ngOnInit() {
  }

  public selectedDate(value: any) {
    if (value && value.start && value.end) {
      this.output.emit({startDate: value.start._d, endDate: value.end._d});
    }
  }
  public calendarCanceled = (value: any) => {
    this.output.emit({startDate: '', endDate: ''});
  }
}

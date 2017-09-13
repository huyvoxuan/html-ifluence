import { Component, OnInit, Input } from '@angular/core';
import { Tour } from './../shared/models/tour';
@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.css']
})
export class TourItemComponent implements OnInit {
  @Input() tour: any;
  public tourDay: number;
  public tourMonth: number;
  constructor() { }

  ngOnInit() {
    this.tourDateStr();
  }
  tourDateStr() {
    if (this.tour && this.tour.DepartureDate) {
      const tourDate = new Date (this.tour.DepartureDate);
      this.tourDay = tourDate.getDate();
      this.tourMonth = tourDate.getMonth() + 1;
    }
  }
}

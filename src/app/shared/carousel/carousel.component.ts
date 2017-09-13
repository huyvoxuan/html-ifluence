import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() photoUrls: string[];
  @Input() carouselID: string;
  public id: string;
  constructor() {
    this.id = '';
  }

  ngOnInit() {
    this.generateCarouselID();
  }
  generateCarouselID() {
    if (this.carouselID) {
      this.id = this.carouselID;
    } else {
      this.id = `carousel-${Math.floor(Math.random() * 100000)}`;
    }
  }
}

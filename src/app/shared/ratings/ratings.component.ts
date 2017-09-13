import { Component, OnInit, OnChanges, Input, ElementRef, Renderer, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() ratingCount: number;
  @Input() containerClass: string;
  @Input() customVoteClass: string;
  @Input() customNoVoteClass: string;
  @Input() isEventBinding: boolean;
  @ViewChild('container') ratingContainer: ElementRef;
  @Input() ratingValue: number;
  /*@Output() returnRating: EventEmitter<number>;*/
  public ratingItems: Element[];
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }
  ngOnChanges() {
  }
  ngAfterViewInit() {
    this.ratingItems = this.ratingContainer.nativeElement.querySelectorAll('.rating-item');
    if (this.isEventBinding) {
      this.initEventOfElement();
    }
  }
  /**
   * binding event for rating items
  **/
  initEventOfElement() {
    for ( let i = 0, len = this.ratingItems.length; i < len; i ++) {
      this.renderer.listen(this.ratingItems[i], 'click', (event: any) => { this.getRatingValue(event); });
    }
  }
  /**
   * get rating value
  **/
  getRatingValue(event: any) {
    const currentElement = event.currentTarget;
    const dataIndex = currentElement.getAttribute('data-index');
    this.ratingValue = dataIndex;
    this.fillStar(this.ratingValue);
    /*this.returnRating.emit(this.ratingValue);*/
  }
  /**
   * add/remove some class of rating element
  **/
  fillStar(value: number) {
    for ( let i = 0, len = this.ratingItems.length; i < len; i ++) {
      const thisItem = this.ratingItems[i];
      const dataIndex = thisItem.getAttribute('data-index');
      if (parseFloat(dataIndex) <= value) {
        thisItem.classList.add('vote-full');
        thisItem.classList.remove('vote-outline');
      } else {
        thisItem.classList.remove('vote-full');
        thisItem.classList.add('vote-outline');
      }
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  public pagingArray: Array<number>;
  public pageActive: number;

  @Input() pageCount: number;
  @Output() output: EventEmitter<number>;
  constructor() {
    this.pagingArray = [];
    this.pageActive = 1;
    this.output = new EventEmitter<number>();
  }

  ngOnInit() {
    this.generatePageIndex();
  }
  generatePageIndex() {
    for (let i = 1; i <= this.pageCount; i++) {
      this.pagingArray.push(i);
    }
  }
  emitPageIndex(index: number) {
    this.output.emit(index);
    this.pageActive = index;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { API } from '../api';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css']
})
export class InputDropdownComponent implements OnInit {

  @Input() input: Object;
  @Input() placeholder: string;
  @Input() imgSource: string;
  @Input() remoteURL: string;

  public list: Object[];
  public value: string;

  @Output() output: EventEmitter<Object>;
  private stateObj: {
    Country?: { Code?: string },
    StateCode?: string
  };
  constructor(private baseService: BaseService) {
    this.remoteURL = API.URL.GETSTATEANDCOUNTRY;
    this.list = [];
    this.value = '';
    this.output = new EventEmitter<Object>();
    this.stateObj = {
      Country: { Code: '' },
      StateCode: ''
    }
  }

  ngOnInit() {
  }
  /**
   * find state and country code of departure/arrival place
   * call api
   **/
  changeValue() {
    if (this.value) {
      const url = `${this.remoteURL}${this.value}`;
      return this.baseService.getData(url).subscribe ((res: any) => {
        if (res && res.Data) {
          this.list = res.Data.Items;
        }
      }, error => {
      })
    } else {
      this.list = [];
      this.output.emit(this.stateObj);
    }
  }
  /**
   * choose an item
   */
  selectedItem(item: any) {
    this.value = item.StateName;
    this.list = [];
    // push value to parent component
    this.input = item;
    this.output.emit(this.input);
  }
  /**
   * blur input
   */
  onBlur() {
    const that = this;
    setTimeout( function () {
      that.list = [];
    }, 500);
  }
}

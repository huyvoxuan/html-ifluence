import { Component, OnInit, Input } from '@angular/core';
import { Tip } from '../shared/tip';
@Component({
  selector: 'app-tip-item',
  templateUrl: './tip-item.component.html',
  styleUrls: ['./tip-item.component.css']
})
export class TipItemComponent implements OnInit {
  @Input() tip: Tip;
  constructor() { }

  ngOnInit() {
  }

}

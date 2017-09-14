import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  @Input() isShow: boolean;
  private subShowingOverlay: Subscription;
  constructor(private utilsService: UtilsService) {
    this.subShowingOverlay = new Subscription();
  }

  ngOnInit() {
    this.subShowingOverlay = this.utilsService.isShow.subscribe( (value: boolean) => {
      this.isShow = value;
    });
  }
  ngOnDestroy() {
    this.subShowingOverlay.unsubscribe();
  }
  public show() {
    this.isShow = true;
  }
  public hide() {
    this.isShow = false;
  }
}

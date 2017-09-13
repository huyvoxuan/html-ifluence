import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { UtilsService } from '../../shared/utils.service';
import { CookieService } from 'angular2-cookie/core';
import { Utils } from '../../shared/utils';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public loginStatus: boolean;
  @ViewChild('navigation') navigation: ElementRef;
  @HostListener('window:scroll', ['$event']) onScrollEvent() {
    if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
      this.navigation.nativeElement.classList.remove('affix-top');
      this.navigation.nativeElement.classList.add('affix');
    } else {
      this.navigation.nativeElement.classList.add('affix-top');
      this.navigation.nativeElement.classList.remove('affix');
    }
  }
  constructor(private utilsService: UtilsService, private cookie: CookieService) { }

  ngOnInit() {
    if (this.cookie.get(Utils.config.cookieKey.token)) {
      this.loginStatus = true;
    }
    this.utilsService.isLoggedIn.subscribe( (value: boolean) => {
      this.loginStatus = value;
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './shared/utils.service';
import { Utils } from './shared/utils';
import { BaseService } from './shared/base.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Antintravel';

  constructor(private translate: TranslateService,
    private utilsService: UtilsService) {
  }
  ngOnInit() {
    this.initLanguage();
  }

  /**
   * init language
   */
  private initLanguage = () => {
    this.translate.addLangs(['vn', 'en']);
    this.translate.setDefaultLang('vn');
  }
  /**
   * change language of site
   * @param: lang {string}
  **/
  public changeLanguage = (lang: string) => {
    //this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.utilsService.setLanguage(lang);
  };
}

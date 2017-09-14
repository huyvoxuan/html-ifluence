import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from './footer/footer.component';

import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2PageScrollModule.forRoot(),
    LayoutRoutingModule,
    TranslateModule.forRoot()
  ],
  declarations: [FooterComponent, HeaderComponent],
  providers: [
    /*LayoutService,*/
    CookieService,
    { provide: CookieOptions, useValue: {} } ],
  exports: [FooterComponent, HeaderComponent]
})
export class LayoutModule { }

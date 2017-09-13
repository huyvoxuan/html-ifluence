import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { NavigationComponent } from './navigation/navigation.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { InstanticonsComponent } from './instanticons/instanticons.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { TourSearchComponent } from '../tours/tour-search/tour-search.component';
import { UsersModule } from '../users/users.module';
import { ToursModule } from '../tours/tours.module';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2PageScrollModule.forRoot(),
    LayoutRoutingModule,
    ToursModule,
    UsersModule,
    TranslateModule.forRoot()
  ],
  declarations: [NavigationComponent, InstanticonsComponent, BannerComponent, FooterComponent],
  providers: [
    /*LayoutService,*/
    CookieService,
    { provide: CookieOptions, useValue: {} } ],
  exports: [NavigationComponent, InstanticonsComponent, BannerComponent, FooterComponent]
})
export class LayoutModule { }

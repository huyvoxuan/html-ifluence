import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { SericesRoutingModule } from './services-routing.module';
import { ServiceAirlineComponent } from './service-airline/service-airline.component';
import { ServiceStudyComponent } from './service-study/service-study.component';
import { ServiceTravelComponent } from './service-travel/service-travel.component';
import { ServiceHotelComponent } from './service-hotel/service-hotel.component';
import { SocialShareModule } from '../shared/social-share/social-share.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    SericesRoutingModule,
    SocialShareModule,
    TranslateModule.forRoot()
  ],
  declarations: [ServicesComponent, ServiceAirlineComponent, ServiceStudyComponent, ServiceTravelComponent, ServiceHotelComponent],
  exports: [ServicesComponent, ServiceAirlineComponent, ServiceStudyComponent, ServiceTravelComponent, ServiceHotelComponent]
})
export class ServicesModule { }

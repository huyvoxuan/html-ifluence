import { NgModule } from '@angular/core';
import { UIRouterModule, Transition } from '@uirouter/angular';

import { ServiceAirlineComponent } from './service-airline/service-airline.component';
import { ServiceStudyComponent } from './service-study/service-study.component';
import { ServiceTravelComponent } from './service-travel/service-travel.component';
import { ServiceHotelComponent } from './service-hotel/service-hotel.component';

const servicesAirline = { name: 'services.airline', url: '/airline',  component: ServiceAirlineComponent };
const servicesStudy = { name: 'services.study', url: '/study',  component: ServiceStudyComponent };
const servicesTravel = { name: 'services.travel', url: '/travel',  component: ServiceTravelComponent };
const servicesHotel = { name: 'services.hotel', url: '/hotel',  component: ServiceHotelComponent };
@NgModule({
  imports: [
    UIRouterModule.forChild({ states: [
      servicesAirline,
      servicesStudy,
      servicesTravel,
      servicesHotel
    ]})
  ],
  exports: [
    UIRouterModule
  ]
})
export class SericesRoutingModule {}

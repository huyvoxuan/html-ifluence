import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { TourItineraryComponent } from './tour-itinerary/tour-itinerary.component';

const tourAttraction = [
  /*{ name: 'attractionDetail', url: '/attraction/:id', component: TourItineraryComponent }*/
]
@NgModule({
  imports: [
    UIRouterModule.forChild({ states: [/*tourAttraction*/]})
  ],
  exports: [
    UIRouterModule
  ]
})
export class ToursRoutingModule {}

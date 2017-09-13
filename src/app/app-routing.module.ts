
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';
import { TourResultComponent } from './tours/tour-result/tour-result.component';
import { TourItineraryComponent } from './tours/tour-itinerary/tour-itinerary.component';
import { BookingComponent } from './booking/booking.component';
const mainStates = [
  { name: 'main', url: '/', redirectTo: 'home' },
  { name: 'home', url: '', component: HomeComponent },
  { name: 'tourDetail', url: '/tour/:id', component: TourDetailComponent },
  { name: 'tourSearch', url: '/tours/search', component: TourResultComponent },
  { name: 'attractionDetail', url: '/attraction/:id', component: TourItineraryComponent },
  { name: 'booking', url: '/booking/:id', component: BookingComponent }
]

@NgModule({
  imports: [
    UIRouterModule.forRoot({ states: mainStates})
  ],
  exports: [
    UIRouterModule
  ]
})
export class AppRoutingModule {}

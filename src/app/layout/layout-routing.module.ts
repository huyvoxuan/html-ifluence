import { NgModule } from '@angular/core';
import { UIRouterModule, UIRouter } from '@uirouter/angular';

import { IntroductionComponent } from '../introduction/introduction.component';
import { ContactComponent } from '../contact/contact.component';
import { RecruitmentComponent } from '../recruitment/recruitment.component';
import { NewsComponent } from '../news/news.component';
import { HomeComponent } from '../home/home.component';
import { EventComponent } from '../events/event.component';
import { ServicesComponent } from '../services/services.component';
import { TipsComponent } from '../tips/tips.component';
import { TourDomesticComponent } from '../tours/tour-domestic/tour-domestic.component';
import { TourAboardComponent } from '../tours/tour-aboard/tour-aboard.component';
import { TourPromotionComponent } from '../tours/tour-promotion/tour-promotion.component';
import { TourStateComponent } from '../tours/tour-state/tour-state.component';
/*const homeState = { name: 'home', url: '',  component: HomeComponent };*/

const layoutStates = [
  { name: 'about', url: '/about',  component: IntroductionComponent },
  { name: 'domesticTours', url: '/tours/domestic',  component: TourDomesticComponent },
  { name: 'aboardTours', url: '/tours/aboard',  component: TourAboardComponent },
  { name: 'promotionTours', url: '/tours/promotion',  component: TourPromotionComponent },
  { name: 'services', url: '/services',  component: ServicesComponent },
  { name: 'events', url: '/events',  component: EventComponent },
  { name: 'news', url: '/news',  component: NewsComponent },
  { name: 'tips', url: '/tips',  component: TipsComponent },
  { name: 'recruitment', url: '/recruitment',  component: RecruitmentComponent },
  { name: 'contact', url: '/contact',  component: ContactComponent },
  { name: 'footerTours', url: '/:id', component: TourStateComponent }
];

@NgModule({
  imports: [
    UIRouterModule.forChild({ states: layoutStates })
  ],
  exports: [
    UIRouterModule
  ]
})
export class LayoutRoutingModule {}

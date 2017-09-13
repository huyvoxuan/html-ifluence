import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { NewsDetailComponent } from './news-detail/news-detail.component';

const eventState = [
  { name: 'newsDetail', url: '/news/:id', component: NewsDetailComponent }
];
@NgModule({
  imports: [
    UIRouterModule.forChild({ states: eventState})
  ],
  exports: [
    UIRouterModule
  ]
})
export class NewsRoutingModule {}

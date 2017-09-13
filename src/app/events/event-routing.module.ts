import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { EventDetailComponent } from './event-detail/event-detail.component';

const eventState = [
  { name: 'eventDetail', url: '/event/:id', component: EventDetailComponent }
];
@NgModule({
  imports: [
    UIRouterModule.forChild({ states: eventState})
  ],
  exports: [
    UIRouterModule
  ]
})
export class EventRoutingModule {}

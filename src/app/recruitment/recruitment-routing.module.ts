import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { JobDetailComponent } from './job-detail/job-detail.component';

const eventState = [
  { name: 'jobDetail', url: '/career/:id', component: JobDetailComponent }
];
@NgModule({
  imports: [
    UIRouterModule.forChild({ states: eventState})
  ],
  exports: [
    UIRouterModule
  ]
})
export class RecruitmentRoutingModule {}

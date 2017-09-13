import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { TipListComponent } from './tip-list/tip-list.component';
import { TipDetailComponent } from './tip-detail/tip-detail.component';

const tipStates = [
  { name: 'tips.all', url: '/others',  component: TipListComponent },
  { name: 'tips.train', url: '/train',  component: TipListComponent },
  { name: 'tips.food', url: '/food',  component: TipListComponent },
  { name: 'tips.thing', url: '/thing',  component: TipListComponent },
  { name: 'tips.river', url: '/river',  component: TipListComponent },
  { name: 'tips.visa', url: '/visa',  component: TipListComponent },
  { name: 'tips.place', url: '/place',  component: TipListComponent },
  { name: 'tips.shopping', url: '/shoping',  component: TipListComponent },
  { name: 'tipDetail', url: '/tip/:id', component: TipDetailComponent }
];
@NgModule({
  imports: [
    UIRouterModule.forChild({ states: tipStates})
  ],
  exports: [
    UIRouterModule
  ]
})
export class TipsRoutingModule {}

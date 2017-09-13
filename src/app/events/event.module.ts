import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from './shared/event.service';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventItemComponent } from './event-item/event-item.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { RatingsModule } from '../shared/ratings/ratings.module';
import { CommentsModule } from '../shared/comments/comments.module';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { ToursModule } from '../tours/tours.module';
import { SocialShareModule } from '../shared/social-share/social-share.module';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    RatingsModule,
    CommentsModule,
    CarouselModule,
    ToursModule,
    SocialShareModule,
    StickyModule,
    TranslateModule.forRoot()
  ],
  declarations: [EventComponent, EventListComponent, EventItemComponent, EventDetailComponent],
  exports: [EventComponent, EventListComponent],
  providers: [EventService]
})
export class EventModule { }

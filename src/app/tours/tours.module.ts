import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourSearchComponent } from './tour-search/tour-search.component';
import { TourListComponent } from './tour-list/tour-list.component';
import { TourService } from './shared/tour.service';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { ToursRoutingModule } from './tours-routing.module';
import { TourResultComponent } from './tour-result/tour-result.component';
import { TourDomesticComponent } from './tour-domestic/tour-domestic.component';
import { TourAboardComponent } from './tour-aboard/tour-aboard.component';
import { TourItemComponent } from './tour-item/tour-item.component';
import { TourItineraryComponent } from './tour-itinerary/tour-itinerary.component';
import { CommentsModule } from '../shared/comments/comments.module';
import { RatingsModule } from '../shared/ratings/ratings.module';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { LikeModule } from '../shared/like/like.module';
import { SocialShareModule } from '../shared/social-share/social-share.module';
import { InputDropdownModule } from '../shared/input-dropdown/input-dropdown.module';
import { MapModule } from '../shared/map/map.module';
import { NumberChangingModule } from '../shared/number-changing/number-changing.module';
import { InputDateModule } from '../shared/input-date/input-date.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
import { TourPromotionComponent } from './tour-promotion/tour-promotion.component';
import { TourRegisteredComponent } from './tour-registered/tour-registered.component';
import { PagingModule } from '../shared/paging/paging.module';
import { RangeDateModule } from '../shared/range-date/range-date.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { TourStateComponent } from './tour-state/tour-state.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToursRoutingModule,
    CommentsModule,
    RatingsModule,
    CarouselModule,
    LikeModule,
    SocialShareModule,
    InputDropdownModule,
    MapModule,
    NumberChangingModule,
    InputDateModule,
    PipesModule,
    StickyModule,
    PagingModule,
    RangeDateModule,
    DirectivesModule,
    TranslateModule.forRoot()
  ],
  declarations: [
    TourSearchComponent,
    TourListComponent,
    TourDetailComponent,
    TourResultComponent,
    TourDomesticComponent,
    TourAboardComponent,
    TourItemComponent,
    TourItineraryComponent,
    TourPromotionComponent,
    TourRegisteredComponent,
    TourStateComponent
  ],
  exports: [TourSearchComponent, TourListComponent],
  providers: [TourService]
})
export class ToursModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipsComponent } from './tips.component';
import { TipItemComponent } from './tip-item/tip-item.component';
import { TipDetailComponent } from './tip-detail/tip-detail.component';
import { TipListComponent } from './tip-list/tip-list.component';
import { TipsRoutingModule } from './tips-routing.module';
import { TipService } from './shared/tip.service';
import { ToursModule } from '../tours/tours.module';
import { RatingsModule } from '../shared/ratings/ratings.module';
import { CommentsModule } from '../shared/comments/comments.module';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { SocialShareModule } from '../shared/social-share/social-share.module';
import { PagingModule } from '../shared/paging/paging.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    TipsRoutingModule,
    ToursModule,
    RatingsModule,
    CommentsModule,
    CarouselModule,
    SocialShareModule,
    PagingModule,
    TranslateModule.forRoot()
  ],
  declarations: [TipsComponent, TipItemComponent, TipDetailComponent, TipListComponent],
  providers: [TipService]
})
export class TipsModule { }

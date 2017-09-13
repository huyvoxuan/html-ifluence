import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

import { RatingsModule } from '../shared/ratings/ratings.module';
import { CommentsModule } from '../shared/comments/comments.module';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { ToursModule } from '../tours/tours.module';
import { SocialShareModule } from '../shared/social-share/social-share.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    RatingsModule,
    CommentsModule,
    CarouselModule,
    SocialShareModule,
    TranslateModule.forRoot()
  ],
  declarations: [NewsComponent, NewsListComponent, NewsItemComponent, NewsDetailComponent]
})
export class NewsModule { }

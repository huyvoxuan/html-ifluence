import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppTranslation } from './app.translation';

import { RecruitmentModule } from './recruitment/recruitment.module';
import { NewsModule } from './news/news.module';
import { TipsModule } from './tips/tips.module';

import { LayoutModule } from './layout/layout.module';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { HomeModule } from './home/home.module';

import { ServicesModule } from './services/services.module';
import { IntroductionModule } from './introduction/introduction.module';
import { ContactModule } from './contact/contact.module';
import { BookingModule } from './booking/booking.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppTranslation,
    FormsModule,
    LayoutModule,
    LayoutRoutingModule,
    UsersModule,
    HomeModule,
    ServicesModule,
    RecruitmentModule,
    NewsModule,
    TipsModule,
    IntroductionModule,
    ContactModule,
    BookingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

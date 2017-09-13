import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ToursModule } from './../tours/tours.module';
import { EventModule } from './../events/event.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    ToursModule,
    EventModule,
    TranslateModule.forRoot()
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { MapModule } from '../shared/map/map.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MapModule,
    TranslateModule.forRoot()
  ],
  declarations: [ContactComponent],
  exports: [ContactComponent]
})
export class ContactModule { }

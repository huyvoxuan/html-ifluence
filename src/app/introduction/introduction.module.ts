import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot()
  ],
  declarations: [IntroductionComponent],
  exports: [IntroductionComponent]
})
export class IntroductionModule { }

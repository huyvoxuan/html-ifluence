import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { RecruitmentComponent } from './recruitment.component';
import { TranslateModule } from '@ngx-translate/core';
import { JobDetailComponent } from './job-detail/job-detail.component';
@NgModule({
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    TranslateModule.forRoot()
  ],
  declarations: [RecruitmentComponent, JobDetailComponent]
})
export class RecruitmentModule { }

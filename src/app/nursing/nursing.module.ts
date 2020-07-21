import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysListComponent } from './days-list/days-list.component';
import { DayComponent } from './day/day.component';
import { BottleFeedingsComponent } from './day/bottle-feedings/bottle-feedings.component';
import { BreastFeedingsComponent } from './day/breast-feedings/breast-feedings.component';
import { DiaperChangesComponent } from './day/diaper-changes/diaper-changes.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [
    DaysListComponent,
    DayComponent,
    BottleFeedingsComponent,
    BreastFeedingsComponent,
    DiaperChangesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DaysListComponent
      },
      {
        path: ':id',
        component: DayComponent
      }
    ]),
    SharedModule,
    MaterialModule
  ]
})
export class NursingModule {}

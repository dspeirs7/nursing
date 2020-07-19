import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaysListComponent } from './days-list/days-list.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
  {
    path: 'days',
    component: DaysListComponent
  },
  {
    path: 'day/:id',
    component: DayComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'days' },
  { path: '**', redirectTo: 'days' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

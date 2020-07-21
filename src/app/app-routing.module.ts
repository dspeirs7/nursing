import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'nursing',
    loadChildren: () =>
      import('./nursing/nursing.module').then(m => m.NursingModule),
    canActivate: [AuthGuard]
  },
  { path: 'login', component: UnauthorizedComponent },
  { path: '', pathMatch: 'full', redirectTo: 'nursing' },
  { path: '**', redirectTo: 'nursing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

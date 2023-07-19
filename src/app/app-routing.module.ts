
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Shared/pages/not-found/not-found.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './Auth/Guards';
import { defaultGuard } from './Auth/Guards/default.guard';










const routes : Routes = [

  {
    path : '',
    redirectTo : 'landing-page/home',
    pathMatch : 'full'
  },
  {
    path : 'landing-page',
    canActivate : [ defaultGuard ],
    loadChildren : () => import('./Landing-Page/landing-page.module').then(m=> m.LandingPageModule),
  },
  {
    path : 'auth',
    canActivate : [ isNotAuthenticatedGuard ],
    loadChildren : () => import('./Auth/auth.module').then( m => m.AuthModule),
  },

  {
    path : 'dashboard',
    canActivate : [ isAuthenticatedGuard ],
    loadChildren : () => import('./Dashboard/dashboard.module').then( m => m.DashboardModule),
  },
  {
    path : '404',
    component : NotFoundComponent,
  },
  {
    path : '**',
    redirectTo : '404',

  }




]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),



  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

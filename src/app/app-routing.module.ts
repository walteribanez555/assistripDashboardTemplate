
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Shared/pages/not-found/not-found.component';










const routes : Routes = [


  {
    path : 'landing-page',
    loadChildren : () => import('./Landing-Page/landing-page.module').then(m=> m.LandingPageModule),
  },
  {
    path : 'auth',
    loadChildren : () => import('./Auth/auth.module').then( m => m.AuthModule),
  },

  {
    path : 'dashboard',
    loadChildren : () => import('./Dashboard/dashboard.module').then( m => m.DashboardModule),
  },
  {
    path : '404',
    component : NotFoundComponent,
  },

  {
    path : '',
    redirectTo : 'landing-page/home',
    pathMatch : 'full'
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

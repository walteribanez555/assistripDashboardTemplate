
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';










const routes : Routes = [
  
  {
    path: '',
    redirectTo : 'home/inicio',
    pathMatch : 'full'
  },
  {
    path: 'home',
    redirectTo : 'home/inicio',
  },

  {
    path: 'dashboard',
    redirectTo : 'dashboard/polizas/listado-polizas',
  },

  
  { path: 'home' , loadChildren: () => import('./Modules/landing-page/landing-page.module').then(m => m.LandingPageModule) },

  
  

  

  {
    path : '**',
    redirectTo : 'home/inicio',
  },
  
  


]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
    
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { HomeComponent } from './components/home/home.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { DatosPolizasComponent } from './components/datos-polizas/datos-polizas.component';
import { ListPolizasComponent } from './components/list-polizas/list-polizas.component';
import { PolizasDetallesComponent } from './components/polizas-detalles/polizas-detalles.component';
import { PolizaComponent } from './components/poliza/poliza.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children : [
      {
        path : 'inicio',
        component : HomeComponent,
      },
      
      {
        path: 'cotizar',
        component: CotizarComponent,
        
        
      },
      { 
        path: 'auth' , loadChildren : () => import('../../Modules/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'datos-polizas',
        component : DatosPolizasComponent
      },
      {
        path : 'polizas',
        component : ListPolizasComponent,
        children: [
          {
            path: 'listado-polizas',
            component : PolizasDetallesComponent,
           
          },
          
          {
            path: 'poliza/:id',
            component : PolizaComponent,
          }
          


        ]
      }
      
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }

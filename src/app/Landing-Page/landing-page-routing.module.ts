import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { HomeComponent } from './Pages/home/home.component';
import { CotizarComponent } from './Pages/cotizar/cotizar.component';
import { DatosPolizasComponent } from './Pages/datos-polizas/datos-polizas.component';

const routes : Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      {
        path : 'home',
        component: HomeComponent,
      },
      {
        path : 'cotizar',
        component : CotizarComponent,
      },
      {
        path : 'datos-polizas',
        component : DatosPolizasComponent,
      }
    ]

  },

  {
    path : '**',
    redirectTo : 'home',
  }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }

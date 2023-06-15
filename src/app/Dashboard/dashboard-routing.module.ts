import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { PolizasDetallesComponent } from './Pages/polizas-detalles/polizas-detalles.component';


const routes : Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      {
        path: 'polizas-detalles',

        component : PolizasDetallesComponent,
      },
      {
        path : 'poliza',
        loadChildren : () => import('./Modules/poliza/poliza.module').then( m => m.PolizaModule),
      },
      {
        path: 'siniestro',
        loadChildren : () => import('./Modules/siniestro/siniestro.module').then( m=> m.SiniestroModule),
      }



    ]
  }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

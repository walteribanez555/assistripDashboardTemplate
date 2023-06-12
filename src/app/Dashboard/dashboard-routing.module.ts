import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { PolizasDetallesComponent } from './Pages/polizas-detalles/polizas-detalles.component';
import { PolizaComponent } from './Pages/poliza/poliza.component';

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
        path : 'poliza/:id',
        component : PolizaComponent,
      }

    ]
  }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { PolizaComponent } from './Pages/poliza/poliza.component';
import { SiniestrosComponent } from './Pages/siniestros/siniestros.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      {
        path : ':id',
        component : PolizaComponent,
      },
      {
        path : ':id/siniestros',
        component : SiniestrosComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolizaRoutingModule { }

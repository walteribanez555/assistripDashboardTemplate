import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { SiniestroComponent } from './Pages/siniestro/siniestro.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      {
        path :':id',
        component: SiniestroComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiniestroRoutingModule { }

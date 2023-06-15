import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PolizasDetallesComponent } from './Pages/polizas-detalles/polizas-detalles.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { PortadaComponent } from './Components/portada/portada.component';
import { AseguradoComponent } from './Components/asegurado/asegurado.component';


@NgModule({
  declarations : [
    //Pages
    LayoutPageComponent,
    PolizasDetallesComponent,
    PortadaComponent,

    //Components
    PortadaComponent,
    AseguradoComponent,

  ],
  providers : [

  ],
  imports : [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule{}

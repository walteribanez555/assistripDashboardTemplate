import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PolizaComponent } from './Pages/poliza/poliza.component';
import { PolizasDetallesComponent } from './Pages/polizas-detalles/polizas-detalles.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { PortadaComponent } from './Components/poliza.components/portada/portada.component';
import { AseguradoComponent } from './Components/poliza.components/asegurado/asegurado.component';


@NgModule({
  declarations : [
    //Pages
    LayoutPageComponent,
    PolizaComponent,
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

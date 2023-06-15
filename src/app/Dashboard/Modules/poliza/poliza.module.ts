import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolizaRoutingModule } from './poliza-routing.module';
import { SiniestrosComponent } from './Pages/siniestros/siniestros.component';
import { RouterModule } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { PolizaComponent } from './Pages/poliza/poliza.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { SiniestroFormComponent } from './Components/siniestro-form/siniestro-form.component';
import { SiniestroComponent } from './Components/siniestro/siniestro.component';
import { BeneficiarioComponent } from './Components/beneficiario/beneficiario.component';
import { PolizaDataComponent } from './Components/poliza-data/poliza-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SiniestrosComponent,
    LayoutPageComponent,
    PolizaComponent,
    SiniestroFormComponent,
    SiniestroComponent,
    BeneficiarioComponent,
    PolizaDataComponent,

  ],
  imports: [
    CommonModule,
    PolizaRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class PolizaModule { }

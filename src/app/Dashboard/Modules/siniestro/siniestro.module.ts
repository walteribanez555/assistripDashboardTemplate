import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiniestroRoutingModule } from './siniestro-routing.module';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { SiniestroComponent } from './Pages/siniestro/siniestro.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSiniestroComponent } from './Components/data-siniestro/data-siniestro.component';
import { MensajeFormComponent } from './Components/mensaje-form/mensaje-form.component';
import { ListMessagesComponent } from './Components/list-messages/list-messages.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    SiniestroComponent,
    DataSiniestroComponent,
    MensajeFormComponent,
    ListMessagesComponent
  ],
  imports: [
    CommonModule,
    SiniestroRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SiniestroModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPolizasComponent } from './listado-polizas/listado-polizas.component';
import { GenerarPolizasComponent } from './generar-polizas/generar-polizas.component';
import { GenerarCotizacionComponent } from './generar-cotizacion/generar-cotizacion.component';
import { PolizasRoutingModule } from './polizas-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ExtractDatePipe } from 'src/app/pipes/extract-date.pipe';
import { ServicesModule } from 'src/app/services/services.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule,FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms"
import { ComponentsModule } from 'src/app/components/components.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';







@NgModule({
  declarations: [
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    GenerarCotizacionComponent,
    
    
    
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PolizasRoutingModule,
    
    ServicesModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SweetAlert2Module,
    
    
    
        
    
  ],
  exports: [ 
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    GenerarCotizacionComponent
  ],
  providers:[
    
  ]
})
export class PolizasModule { }

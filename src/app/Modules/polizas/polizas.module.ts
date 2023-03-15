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
import { ListCardComponent } from 'src/app/components/listCard/list-card.component';
import { ClienteFormularioComponent } from 'src/app/components/cliente-formulario/cliente-formulario.component';





@NgModule({
  declarations: [
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    GenerarCotizacionComponent,
    ListCardComponent,
    ClienteFormularioComponent
    
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PolizasRoutingModule,
    ServicesModule,
    PipesModule,

    
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

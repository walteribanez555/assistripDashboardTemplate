import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { ExtrasService } from './Shared/services/requests/extras.service';
import { GetLocationService } from './Shared/services/get-location.service';
import { BeneficiariosService } from './Shared/services/requests/beneficiarios.service';
import { BeneficiosService } from './Shared/services/requests/beneficios.service';
import { ExtrasPolizasService } from './Shared/services/requests/beneficiosExtras.service';
import { CatalogosService } from './Shared/services/requests/catalogos.service';
import { ClientesService } from './Shared/services/requests/clientes.service';
import { CuponesService } from './Shared/services/requests/cupones.service';
import { PlanesService } from './Shared/services/requests/planes.service';
import { PolizasService } from './Shared/services/requests/polizas.service';
import { PreciosService } from './Shared/services/requests/precios.service';
import { ServiciosService } from './Shared/services/requests/servicios.service';
import { VentasService } from './Shared/services/requests/ventas.service';
import { ModalService } from './Shared/components/modal/modal.service';
import { SharedModule } from './Shared/shared.module';
import { BeneficiariosPolizasService } from './Shared/services/requests/beneficiarios-polizas.service';
import { PolizasVentasService } from './Shared/services/requests/polizas-ventas.service';
import { UserService } from './Shared/services/requests/user.service';
import { RolService } from './Shared/services/requests/rol.service';
import { ErrorInterceptor } from './Shared/interceptors/error.interceptor';
import { SessionInterceptor } from './Shared/interceptors/session.interceptor';
import { TransformDataService } from './Shared/services/utils/TransformDataService.service';
import { PolizaLocalService } from './Shared/services/utils/poliza-local.service';
import { MensajeService } from './Shared/services/requests/mensaje.service';
import { TokenService } from './Shared/services/utils/token.service';
import { RestService } from './Shared/services/requests/rest.service';
import { LocalStorageService } from './Shared/services/utils/local-storage.service';
import { BlogService } from './Shared/services/requests/blog.service';







@NgModule({
  declarations: [
    AppComponent,




  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,





  ],
  providers: [
    BeneficiosService,
    CatalogosService,
    ClientesService,
    CuponesService,
    ExtrasService,
    PlanesService,
    PolizasService,
    PreciosService,
    ServiciosService,
    GetLocationService,
    VentasService,
    ExtrasPolizasService,
    BeneficiariosService,
    ModalService,
    BeneficiariosPolizasService,
    PolizasVentasService,
    UserService,
    RolService,
    TransformDataService,
    PolizaLocalService,
    MensajeService,
    TokenService,
    RestService,
    LocalStorageService,
    BlogService,

    {
      provide : HTTP_INTERCEPTORS,
      useClass : SessionInterceptor,
      multi : true,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ErrorInterceptor,
      multi : true,
    }
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

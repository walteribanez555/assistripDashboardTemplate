import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { CotizarComponent } from './pages/cotizar/cotizar.component';
import { DataCotizadorComponent } from './components/data-cotizador/data-cotizador.component';
import { DatosPolizasComponent } from './pages/datos-polizas/datos-polizas.component';
import { HomeComponent } from './pages/home/home.component';
import { ListPolizasComponent } from './pages/list-polizas/list-polizas.component';
import { PolizaComponent } from './pages/poliza/poliza.component';
import { PolizasDetallesComponent } from './pages/polizas-detalles/polizas-detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ModalService } from '../shared/Components/modal/modal.service';
import { ModalComponent } from '../shared/Components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './components/plan/plan.component';
import { InfoComponent } from './components/plan/info/info/info.component';
import { ShoppingCartComponent } from './components/planes/shoppingCart/shopping-cart/shopping-cart.component';
import { CategoryPlanComponent } from './components/category-plan/category-plan.component';
import { SubCatComponent } from './components/plan/info/sub-cat/sub-cat.component';


@NgModule({
  declarations: [
    CotizarComponent,
    DataCotizadorComponent,
    DatosPolizasComponent,
    CotizarComponent,
    HomeComponent,
    ListPolizasComponent,
    PolizaComponent,
    PolizasDetallesComponent,
    LandingPageComponent,
    CotizacionComponent,
    CotizadorComponent,
    PlanesComponent,
    PlanComponent,
    InfoComponent,
    ShoppingCartComponent,
    CategoryPlanComponent,
    SubCatComponent,

  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SharedModule,


    RouterModule,

  ],
  providers: [
  ]

})
export class LandingPageModule { }

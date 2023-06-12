import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { DataCotizadorComponent } from './components/home/data-cotizador/data-cotizador.component';
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
import { CotizadorComponent } from './components/cotizacion/cotizador/cotizador.component';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './components/plan/plan.component';
import { InfoComponent } from './components/plan/info/info/info.component';
import { ShoppingCartComponent } from './components/planes/shoppingCart/shopping-cart/shopping-cart.component';
import { CategoryPlanComponent } from './components/cotizacion/category-plan/category-plan.component';
import { SubCatComponent } from './components/plan/info/sub-cat/sub-cat.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CotizadosComponent } from './components/cotizacion/cotizados/cotizados.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CotizarComponent } from './components/home/cotizar/cotizar.component';
import { AyudaComponent } from './components/home/ayuda/ayuda.component';
import { ProcedimientoComponent } from './components/home/procedimiento/procedimiento.component';
import { AboutUsComponent } from './components/home/about-us/about-us.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ModalHeadlineComponent } from './components/data-polizas/modal-headline/modal-headline.component';
import { SelectorHeadlineComponent } from './components/data-polizas/selector-headline/selector-headline.component';
import { PolizaModalComponent } from './components/data-polizas/poliza/poliza.component';
import { AseguradoComponent } from './components/polizas/asegurado/asegurado.component';
import { PortadaComponent } from './components/polizas/portada/portada.component';


@NgModule({
  declarations: [
    DataCotizadorComponent,
    DatosPolizasComponent,
    HomeComponent,
    ListPolizasComponent,
    PolizaComponent,
    PolizasDetallesComponent,
    LandingPageComponent,
    CotizacionComponent,
    CotizadorComponent,
    PlanComponent,
    InfoComponent,
    ShoppingCartComponent,
    CategoryPlanComponent,
    SubCatComponent,
    CotizadosComponent,
    SliderComponent,
    AboutUsComponent,
    ProcedimientoComponent,
    AyudaComponent,
    FooterComponent,
    CotizarComponent,
    PlanesComponent,
    PolizaComponent,
    ModalHeadlineComponent,
    SelectorHeadlineComponent,
    PolizaModalComponent,
    AseguradoComponent,
    PortadaComponent


  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SharedModule,
    NgxIntlTelInputModule,

    RouterModule,

  ],
  providers: [
  ]

})
export class LandingPageModule { }

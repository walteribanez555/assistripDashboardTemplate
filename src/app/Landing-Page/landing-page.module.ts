import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


import { FooterComponent } from './Components/footer/footer.component';
import { AboutUsComponent } from './Components/home.components/about-us/about-us.component';
import { AyudaComponent } from './Components/home.components/ayuda/ayuda.component';
import { DataCotizadorComponent } from './Components/home.components/data-cotizador/data-cotizador.component';
import { SliderComponent } from './Components/home.components/slider/slider.component';
import { HomeCotizarComponent } from './Components/home.components/cotizar/cotizar.component';
import { PlanesComponent } from './Components/cotizar.components/planes/planes.component';
import { CotizadorComponent } from './Components/cotizar.components/cotizador/cotizador.component';
import { ProcedimientoComponent } from './Components/home.components/procedimiento/procedimiento.component';
import { CotizadosComponent } from './Components/home.components/cotizados/cotizados.component';


import { HomeComponent } from './Pages/home/home.component';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { CotizarComponent } from './Pages/cotizar/cotizar.component';
import { DatosPolizasComponent } from './Pages/datos-polizas/datos-polizas.component';
import { ShoppingCartComponent } from './Components/planes.components/shopping-cart/shopping-cart.component';
import { InfoComponent } from './Components/plan.components/info/info.component';
import { SubCatComponent } from './Components/plan.components/sub-cat/sub-cat.component';
import { CategoryPlanComponent } from './Components/cotizar.components/category-plan/category-plan.component';
import { PlanComponent } from './Components/cotizar.components/plan/plan.component';
import { ModalHeadlineComponent } from './Components/datos-polizas.components/modal-headline/modal-headline.component';
import { SelectorHeadlineComponent } from './Components/datos-polizas.components/selector-headline/selector-headline.component';
import { PolizaModalComponent } from './Components/datos-polizas.components/poliza/poliza.component';

import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { TuPolizaComponent } from './Pages/tu-poliza/tu-poliza.component';
import { DataPaymentComponent } from './Components/data-payment/data-payment.component';
import { ConfirmPaymentComponent } from './Pages/confirm-payment/confirm-payment.component';
import { ShoppingCartPolizasComponent } from './Components/datos-polizas.components/shopping-cart-polizas/shopping-cart-polizas.component';


@NgModule({
  declarations : [
    //Pages
    LayoutPageComponent,
    HomeComponent,
    CotizarComponent,
    DatosPolizasComponent,

    ///Components
    FooterComponent,

      //Home
      AboutUsComponent,
      AyudaComponent,
      CotizadosComponent,
      ProcedimientoComponent,
      DataCotizadorComponent,
      SliderComponent,
      HomeCotizarComponent,


      //Cotizar
      PlanesComponent,
        //Planes
          ShoppingCartComponent,
      PlanComponent,
        //Plan
          InfoComponent,
          SubCatComponent,
      CategoryPlanComponent,

      CotizadorComponent,

      //Datos-polizas
      ModalHeadlineComponent,
      SelectorHeadlineComponent,
      PolizaModalComponent,
      TuPolizaComponent,
      DataPaymentComponent,
      ConfirmPaymentComponent,
      ShoppingCartPolizasComponent,


  ],
  providers : [


  ],
  imports : [
    CommonModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule,
    SharedModule,
    RouterModule,



  ]
})
export class LandingPageModule{}

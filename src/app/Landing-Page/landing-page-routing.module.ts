import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { HomeComponent } from './Pages/home/home.component';
import { CotizarComponent } from './Pages/cotizar/cotizar.component';
import { DatosPolizasComponent } from './Pages/datos-polizas/datos-polizas.component';
import { TuPolizaComponent } from './Pages/tu-poliza/tu-poliza.component';
import { ConfirmPaymentComponent } from './Pages/confirm-payment/confirm-payment.component';
import { PoliticasComponent } from './Pages/politicas/politicas.component';
import { BlogsComponent } from './Pages/blogs/blog.component';
import { BlogComponent } from './Pages/blog/blog.component';

const routes : Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      {
        path : 'home',
        component: HomeComponent,
      },
      {
        path : 'cotizar',
        component : CotizarComponent,
      },
      {
        path : 'datos-polizas',
        component : DatosPolizasComponent,
      },
      {
        path : 'tu-poliza/:id',
        component : TuPolizaComponent,
      },
      {
        path : 'confirm-payment/:id',
        component : ConfirmPaymentComponent,
      },
      {
        path : 'politicas',
        component : PoliticasComponent,
      },
      {
        path : 'blogs',
        component : BlogsComponent,
      },
      {
        path : 'blog/:id',
        component : BlogComponent,
      }

    ]

  },

  {
    path : '**',
    redirectTo : 'home',
  }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }

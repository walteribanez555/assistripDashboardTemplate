import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { OtpInputComponent } from './Components/otp-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Pages/login/login.component';
import { SharedModule } from '../Shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations : [
    //Pages
    LayoutPageComponent,
    LoginComponent,
    //Components
    OtpInputComponent,

  ],
  providers : [

  ],
  imports : [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgOtpInputModule
  ]
})
export class AuthModule{}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  private authService  = inject(AuthService);
  private router = inject(Router)

  public loginForm = new FormGroup(
    {
      identifier: new FormControl('', [Validators.required]),
      otp : new FormControl( '', [Validators.required, Validators.minLength(5)]),
    }
  );





  numberForm : number = 1;

  type : boolean = false;


  constructor() { }


  togglePasswordVisibility(): void {
    this.type = !this.type;
  }


  nextStep(){
    if(this.loginForm.get('identifier')?.errors){
      return;
    }
    this.numberForm = 2;

  }

  onLogin(){

    if(this.loginForm.value.identifier && this.loginForm.valid)
    this.authService.login("walteribanez555@gmail.com","Walteribane8612",this.loginForm.value.identifier)
      .subscribe(  {
        next: () => this.router.navigateByUrl('/dashboard/polizas-detalles'),
        error : (message)=> {
          // Swal.fire('Error',message,'error' );
        }
      })
      else{
        Swal.fire('Oops','Se requiere rellenar el campo', 'warning');
      }




  }

  onBackToggle(){
    this.numberForm = 1 ;
  }



  otp: string = '';

  onOtpEntered(otpDigit: string): void {
    this.otp += otpDigit;
    if (this.otp.length < 5) {
      this.focusNextInput();
    } else if (this.otp.length === 5) {
      this.verifyOTP();
    }
  }

  onOtpBack(otpDigit : any) : void{
    this.otp = this.otp.slice(this.otp.length-1, this.otp.length-2);
    console.log(this.otp);
    if (this.otp.length > 0 ) {


      // this.focusPrevInput();
    }

  }

  focusNextInput(): void {
    const inputs = document.getElementsByTagName('input');
    const nextInput = Array.from(inputs).find(input => input.value === '') as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }

  focusPrevInput(): void {
    const inputs = document.getElementsByTagName('input');
    const prevInput = Array.from(inputs).reverse().find(input => input.value === '') as HTMLInputElement;
    if (prevInput) {
      prevInput.focus();
    }
  }

  verifyOTP(): void {
    // Aquí puedes realizar la verificación del OTP ingresado
    console.log('OTP ingresado:', this.otp);
    // Reinicia el valor del OTP para permitir la verificación posterior
    this.otp = '';




  }
}

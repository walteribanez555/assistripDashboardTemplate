import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
    }
  ); 


  


  numberForm : number = 1;

  type : boolean = false;


  constructor() { }


  togglePasswordVisibility(): void {
    this.type = !this.type;
  }


  onLogin(){
    if(!this.loginForm.valid){
      return;
    }


    this.numberForm = 2;

    console.log("jhk");
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

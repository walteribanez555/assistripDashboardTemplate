import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { loadingAnimation } from 'src/app/Shared/animations/loading.animation';
import { VentasService } from 'src/app/Shared/services/requests/ventas.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    loadingAnimation,
  ]
})
export class LoginComponent implements OnInit {


  private authService  = inject(AuthService);
  private router = inject(Router)

  public loginForm = new FormGroup(
    {
      identifier: new FormControl('', [Validators.required]),
      password : new FormControl( '', [Validators.required, Validators.minLength(5)]),
    }
  );





  numberForm : number = 1;


  hasLoaded: boolean = true;

  showPassword: boolean = false;




  constructor() { }
  ngOnInit(): void {



  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  nextStep(){
    if(this.loginForm.get('identifier')?.errors){
      return;
    }
    this.numberForm = 2;

  }

  onLogin(){

    console.log("Login user");
    this.hasLoaded = false;


    if(this.loginForm.value.identifier && this.loginForm.valid && this.loginForm.value.password)
    this.authService.login(this.loginForm.value.identifier,this.loginForm.value.password)
      .subscribe(  {
        next: (data) => { this.router.navigateByUrl('/dashboard/polizas-detalles')},
        error : (message)=> {
          // Swal.fire('Error',message,'error' );
        },
        complete : () =>{this.hasLoaded =true}
      })
      else{
        Swal.fire('Oops','Se requiere rellenar el campo', 'warning');
      }




  }




}

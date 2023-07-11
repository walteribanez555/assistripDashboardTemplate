import { ChangeDetectorRef, Component, OnInit,  ElementRef,TemplateRef, inject } from '@angular/core';
import { AuthService } from './Auth/services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject(AuthService)


  constructor(){
    this.authService.checkAuthStatus();
  }





}

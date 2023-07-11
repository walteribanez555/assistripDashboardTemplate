import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { NavigationService } from '../../services/navigation-service.service';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnDestroy, OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);
  private navigationService = inject(NavigationService);



  constructor(){
    // this.router.events.subscribe(event => {
    //       if (event instanceof NavigationEnd) {
    //         this.navigationService.setLastNavigation(event.urlAfterRedirects);
    //       }
    //     });
  }

  btnClose( ){
    this.authService.logout();

  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }

}

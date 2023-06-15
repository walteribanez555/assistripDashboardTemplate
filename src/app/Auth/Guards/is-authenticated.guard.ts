import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { NavigationService } from 'src/app/Dashboard/services/navigation-service.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const navigationService = inject(NavigationService);
  const router = inject(Router);





  if(authService.authStatus() === AuthStatus.authenticated) {


    // if(navigationService.checkLastNavigation()){
    //   const url = navigationService.navigation();

    //   // router.navigateByUrl( url ? url : 'dashboard/polizas-detalles' );
    // }


    return true;
  }



  if(authService.authStatus() === AuthStatus.checking ){
    return false;
  }




  // const url = state.url;
  // localStorage.setItem('path', url);

  router.navigateByUrl('/auth/login');


  return false;


};

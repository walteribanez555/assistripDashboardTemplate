import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { NavigationService } from 'src/app/Dashboard/services/navigation-service.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);



  if(authService.isInvited()){
    router.navigateByUrl('/auth/login');

    return false;
  }


  if(authService.authStatus() === AuthStatus.authenticated) {

    return true;
  }



  if(authService.authStatus() === AuthStatus.checking ){

    return true;
  }



  router.navigateByUrl('/auth/login');


  return false;


};

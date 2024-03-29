import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router      = inject( Router );

  if( authService.isInvited()){
    return true;
  }



  if ( authService.authStatus() === AuthStatus.authenticated ) {
    router.navigateByUrl('/dashboard/polizas-detalles');
    return false;
  }


  return true;
};

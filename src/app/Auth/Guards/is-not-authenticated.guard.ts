import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  console.log("not authenticated");
  const authService = inject( AuthService );
  const router      = inject( Router );

  if( authService.isInvited()){
    console.log("Invitado")
    return true;
  }



  if ( authService.authStatus() === AuthStatus.authenticated ) {
    console.log("No invitado");
    router.navigateByUrl('/dashboard/polizas-detalles');
    return false;
  }


  return true;
};

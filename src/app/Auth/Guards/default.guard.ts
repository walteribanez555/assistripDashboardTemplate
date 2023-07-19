import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const defaultGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  if(authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }


  return authService.loadByDefaultUser();

};

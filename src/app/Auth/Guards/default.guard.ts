import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const defaultGuard: CanActivateFn = (route, state) => {

  console.log("default guard");
  const authService = inject(AuthService);

  if(authService.authStatus() === AuthStatus.authenticated) {
    console.log("Usuario autenticado");

    return true;
  }

  return new Promise<boolean>((resolve) => {
    authService.loadByDefaultUser();
  });

};

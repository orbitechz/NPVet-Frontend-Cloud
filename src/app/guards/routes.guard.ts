import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const routesGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);

  if (loginService.getToken() == null) {
    if (
      route.url.toString() === '/login' ||
      route.url.toString() === '/logout'
    ) {
      if (route.url.toString() === '/logout') {
        loginService.logout();
      }
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else return true;
};

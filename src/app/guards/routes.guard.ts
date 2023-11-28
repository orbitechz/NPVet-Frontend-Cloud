import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const routesGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);
  let rota = route.url.toString();
  let token = loginService.getToken();
  let role = route.data['role'];

  if (rota === 'login') {
    if (token != null) router.navigate(['/web']);
    return true;
  } else if (rota === 'logout') {
    loginService.logout();
    router.navigate(['/web']);
    return true;
  } else {
    if (token === null) {
      router.navigate(['/login']);
      return true;
    }else{
      return loginService.hasPermission(role)
    }
  }
};

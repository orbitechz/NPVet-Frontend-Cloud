import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const routesGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);
  let token = loginService.getToken()
  
  // if(route.toString() === "/login"){
  //   if(token!=null){
  //     router.navigate(['/web'])
  //     return true
  //   }else{
  //     return true
  //   }  
  // }else if (token == null) {
  //   router.navigate(['/login']);
  //   return true;
  // } else {return true;}

  if (loginService.getToken() == null) {
    if(route.url.toString() === "/login"){
      return true
    }else{
      router.navigate(['/login']);
      return false;
    }
  } else
    return true;
};

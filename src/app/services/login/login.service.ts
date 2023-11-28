import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login/login';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL = `${environment.apiUrl}/usuario`;
  http = inject(HttpClient);
  constructor() { }
  logar(login: Login): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL, login);
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.baseURL + '/deslogar');
  }
  addToken(token: string) {
    localStorage.setItem('token', token);
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }
  hasPermission(role: string) {
    let Usuario = this.jwtDecode() as Usuario;
    if (Usuario.role == role)
      return true;
    else
      return false;
  }
}

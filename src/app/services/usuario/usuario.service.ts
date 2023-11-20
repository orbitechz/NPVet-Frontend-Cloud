import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseURL = `${environment.apiUrl}/usuario`;
  http = inject(HttpClient);

  
  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`);
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/all`);
  }

  getUsuarioByName(nome: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/nome/${nome}`);
  }

  getSecretaria(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/secretaria`);
  }

  getAdm(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/adm`);
  }

  getVeterinarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/veterinarios`);
  }

  getUsername(username: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/username/${username}`);
  }

  getUsuarioByCpf(cpf: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/cpf/${cpf}`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseURL}/post`, usuario);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseURL}/update/${id}`, usuario);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseURL}/delete/${id}`);
  }
  
}

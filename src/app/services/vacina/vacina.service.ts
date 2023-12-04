import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacina } from 'src/app/models/vacina/vacina';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  constructor() { }

  private baseURL = `${environment.apiUrl}/vacina`;
  http = inject(HttpClient);

  
  getById(id: number): Observable<Vacina> {
    return this.http.get<Vacina>(`${this.baseURL}/${id}`);
  }

  getAll(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.baseURL}/all`);
  }

  getVacinaByName(nome: string): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.baseURL}/nome/${nome}`);
  }

  getSecretaria(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.baseURL}/secretaria`);
  }

  getAdm(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.baseURL}/adm`);
  }

  getVeterinarios(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.baseURL}/veterinarios`);
  }

  getUsername(username: string): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.baseURL}/username/${username}`);
  }

  getVacinaByCpf(cpf: string): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${this.baseURL}/cpf/${cpf}`);
  }

  create(Vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(`${this.baseURL}/post`, Vacina);
  }

  update(id: number, Vacina: Vacina): Observable<Vacina> {
    return this.http.put<Vacina>(`${this.baseURL}/update/${id}`, Vacina);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseURL}/delete/${id}`);
  }
}

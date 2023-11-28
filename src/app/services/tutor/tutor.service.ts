import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from 'src/app/models/tutor/tutor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private baseURL = `${environment.apiUrl}/tutor`;
  http = inject(HttpClient);
  constructor() {}
  getById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.baseURL}/id/${id}`);
  }
  getByNome(nome: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.baseURL}/nome/${nome}`);
  }
  getAll(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.baseURL}/all`);
  }
  getAllAtivados(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.baseURL}/all/ativos`);
  }
  getAllDesativados(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.baseURL}/all/desativados`);
  }
  getByCpf(cpf: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.baseURL}/cpf/${cpf}`);
  }
  getByRg(rg: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.baseURL}/rg/${rg}`);
  }
  create(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(`${this.baseURL}/post`, tutor);
  }
  update(id: number, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.baseURL}/update/${id}`, tutor);
  }
  delete(id: number): Observable<Tutor> {
    return this.http.delete<any>(`${this.baseURL}/delete/${id}`);
  }
  activate(id: number): Observable<Tutor> {
    return this.http.post<any>(`${this.baseURL}/activate/${id}`, null);
  }
}

import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal/animal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private baseURL = `${environment.apiUrl}/animal`;
  http = inject(HttpClient);

  constructor() { }

  getById(id: number): Observable<Animal>{
    return this.http.get<Animal>(`${this.baseURL}/id/${id}`);
  }

  getByTutor(id: number): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.baseURL}/tutor/${id}`);
  }

  getByTutorAndAnimalName(id: number,nome : string) : Observable<Animal>{
    return this.http.get<Animal>(`${this.baseURL}/tutor/${id}/nome/${nome}`);
  }

  getAll(): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.baseURL}/all`);
  }

  getAllDesativados(): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.baseURL}/all/desativados`);
  }

  getAllAtivo(): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.baseURL}/all/ativos`);
  }

  getByNome(nome: string): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.baseURL}/nome/${nome}`);
  }

  getByRaca(raca: string): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.baseURL}/raca/${raca}`)
  }

  getByEspecie(especie: string): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.baseURL}/especie/${especie}`);
  }

  save(animal: Animal): Observable<Animal>{
    return this.http.post<Animal>(`${this.baseURL}/post`, animal);
  }

  update(id: number, animal: Animal): Observable<Animal>{
    return this.http.put<Animal>(`${this.baseURL}/update/${animal.id}`, animal);
  }

  delete(id: number): Observable<HttpStatusCode>{
    return this.http.delete<HttpStatusCode>(`${this.baseURL}/delete/${id}`);
  }

}

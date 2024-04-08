import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subastas } from './subastas';

@Injectable({
  providedIn: 'root'
})
export class SubastasService {

  private baseURL = "http://localhost:80/api/subastas";

  constructor(private http: HttpClient) { }

  obtenerListaSubastas(): Observable<Subastas[]> {
    return this.http.get<Subastas[]>(`${this.baseURL}`);
  }

  crearSubasta(subasta: Subastas): Observable<Subastas> {
    return this.http.post<Subastas>(`${this.baseURL}`, subasta);
  }

  actualizarSubasta(id: number, subasta: Subastas): Observable<Subastas> {
    return this.http.put<Subastas>(`${this.baseURL}/${id}`, subasta);
  }

  eliminarSubasta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }
}

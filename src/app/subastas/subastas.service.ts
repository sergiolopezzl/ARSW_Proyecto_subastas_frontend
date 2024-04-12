import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subastas } from './subastas';
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class SubastasService {

  private baseURL = "http://localhost:3000/api/subastas";

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

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`http://localhost:3000/api/usuarios`);
  }
}

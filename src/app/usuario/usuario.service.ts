import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario'; // Importa la clase Usuario

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseURL = "http://localhost:80/api/usuarios"; // URL base para los usuarios

  constructor(private http: HttpClient) { }

  obtenerListaUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseURL}`, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseURL}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }
}

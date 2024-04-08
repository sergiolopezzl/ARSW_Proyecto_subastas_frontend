import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario'; // Importa la clase Usuario
import { UsuariosService } from '../usuario/usuario.service'; // Importa el servicio UsuariosService

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = []; // Arreglo para almacenar la lista de usuarios

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.obtenerListaUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
}

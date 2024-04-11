// crud-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario'; // Importa la clase Usuario
import { UsuariosService } from '../usuario/usuario.service'; // Importa el servicio UsuarioService

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerListaUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  guardarUsuario() {
    if (this.usuario.id) {
      this.actualizarUsuario(this.usuario.id, this.usuario);
    } else {
      this.crearUsuario(this.usuario);
    }
  }

  crearUsuario(usuario: Usuario) {
    this.usuarioService.crearUsuario(usuario).subscribe(
      response => {
        console.log('Usuario creado:', response);
        this.obtenerUsuarios(); // Actualiza la lista después de guardar
        this.limpiarFormulario();
      },
      error => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  actualizarUsuario(id: number, usuario: Usuario) {
    this.usuarioService.actualizarUsuario(id, usuario).subscribe(
      response => {
        console.log('Usuario actualizado:', response);
        this.obtenerUsuarios(); // Actualiza la lista después de guardar
        this.limpiarFormulario();
      },
      error => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  editarUsuario(usuario: Usuario) {
    this.usuario = { ...usuario }; // Copia el usuario para editar en el formulario
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
          this.obtenerUsuarios(); // Actualiza la lista después de eliminar
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }

  limpiarFormulario() {
    this.usuario = new Usuario(); // Reinicia el objeto usuario para crear uno nuevo
  }
}

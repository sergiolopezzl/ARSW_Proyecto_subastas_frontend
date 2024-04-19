import { UsuariosService } from './../usuario/usuario.service';
// subasta-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubastasService } from '../subastas/subastas.service';
import { Subastas } from '../subastas/subastas'; // Asegúrate de importar el modelo correcto
import { Usuario } from '../usuario/usuario'; // Importa la clase Usuario
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-subasta-detail',
  templateUrl: './subasta-detail.component.html',
  styleUrls: ['./subasta-detail.component.css']
})
export class SubastaDetailComponent implements OnInit {
  subastas: Subastas[] = [];
  subastaId: number | null = null;
  subasta: Subastas | null = null;
  usuarios: Usuario[] = [];
  mostrarDetalleSubasta = false;
  valorPuja: number = 0; // Propiedad para almacenar el valor de la puja

  usuario: Usuario = new Usuario();
  constructor(private subastasService: SubastasService, private route: ActivatedRoute, private socketService: SocketService, private UsuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subastaId = +params['id']; // Convierte el parámetro de la URL a número
      this.obtenerSubastas();
      this.cargarSubasta();
      this.obtenerUsuariosPorIdApuesta();
      this.socketService.joinRoom("Sala1");

      // Suscribirse a mensajes WebSocket
      this.socketService.getUserSubject().subscribe((usuario: Usuario) => {
        // Actualizar la lista de usuarios si se recibe un mensaje del WebSocket
        //this.usuario = usuario;
        if (usuario) {
          this.obtenerUsuariosPorIdApuesta();
        }

      });
    });
  }

  obtenerSubastas() {
    this.subastasService.obtenerListaSubastas().subscribe(
      (datos: Subastas[]) => {
        this.subastas = datos;
        this.cargarSubasta(); // Mover la función aquí para evitar la búsqueda innecesaria
      },
      error => {
        console.error('Error al obtener las subastas:', error);
      }
    );
  }

  cargarSubasta() {
    if (this.subastaId!== null && this.subastas.length > 0) {
      this.subasta = this.subastas.find(item => item.id === this.subastaId) || null;
    }
  }

  esSubastaCorrecta(subasta: Subastas): boolean {
    return subasta.id === this.subastaId;
  }

  obtenerUsuariosPorIdApuesta() {
    if (this.subastaId !== null) {
      this.subastasService.obtenerUsuarios().subscribe(
        (usuarios: Usuario[]) => {
          this.usuarios = usuarios.filter(usuario => usuario.idDeApuesta === this.subastaId);
        },
        error => {
          console.error('Error al obtener usuarios por ID de apuesta:', error);
        }
      );
    }
  }

  obtenerUsuarios() {
    this.UsuariosService.obtenerListaUsuarios().subscribe(
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
      this.UsuariosService.actualizarUltimoUsuario(this.usuario).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          this.obtenerUsuarios(); // Actualiza la lista después de guardar
          this.limpiarFormulario();
        },
        error => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.UsuariosService.crearUsuario(this.usuario).subscribe(
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
  }

  crearUsuario(usuario: Usuario) {
    this.UsuariosService.crearUsuario(usuario).subscribe(
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
    this.UsuariosService.actualizarUsuario(id, usuario).subscribe(
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
      this.UsuariosService.eliminarUsuario(id).subscribe(
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

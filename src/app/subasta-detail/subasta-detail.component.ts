import { UsuariosService } from './../usuario/usuario.service';
// subasta-detail.component.ts
import { HttpClient } from '@angular/common/http';
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
  subasta: any; // Asegúrate de definir la estructura de tu objeto subasta
  usuario: any = { gasto: 0 };
  usuarios: any[] = []; // Array para almacenar los usuarios

  subastas: Subastas[] = [];
  subastaId: number | null = null;

  mostrarDetalleSubasta = false;
  valorPuja: number = 0; // Propiedad para almacenar el valor de la puja

  constructor(private subastasService: SubastasService, private route: ActivatedRoute, private socketService: SocketService, private UsuariosService: UsuariosService, private http: HttpClient) {}

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
    if (this.usuario.gasto > 0) {
      // Envía la señal a la URL especificada
      const url = 'http://localhost:4200/chat/1';
      this.http.post(url, { gasto: this.usuario.gasto }).subscribe(response => {
        console.log('Respuesta del servidor:', response);
        // Lógica adicional después de enviar la solicitud, si es necesario

        // Por ejemplo, agregar el usuario a la lista de usuarios
        this.usuarios.push({
          nombre: 'Nombre del usuario', // Puedes reemplazar esto con el nombre real del usuario
          id: this.usuarios.length + 1,
          idDeApuesta: 'ID de la apuesta', // Reemplazar con el ID real de la apuesta si está disponible
          gasto: this.usuario.gasto
        });

        // Resetea el campo de puja
        this.usuario.gasto = 0;
      }, error => {
        console.error('Error al enviar la solicitud:', error);
      });
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

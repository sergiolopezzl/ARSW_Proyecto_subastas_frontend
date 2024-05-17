// crud-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario'; // Importa la clase Usuario
import { UsuariosService } from '../usuario/usuario.service'; // Importa el servicio UsuarioService
import { SubastasService } from '../subastas/subastas.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario();


  constructor(private usuarioService: UsuariosService, private socketService: SocketService, private subastasService: SubastasService ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.connectToSocket();
    this.socketService.getUserSubject().subscribe((usuario: Usuario) => { // Cambio aquí
      // Actualizar la lista de usuarios en tiempo real
      this.usuarios.push(usuario); // Agregar el nuevo usuario a la lista
    });
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

        // Enviar mensaje WebSocket después de crear usuario
        this.socketService.sendMessage("Sala1", response);

        // Emitir el usuario creado al observable del SocketService
        this.socketService.getUserSubject().next(response); // Asegúrate de tener este método en tu servicio
        // Emitir la lista actualizada de usuarios al WebSocket

        this.actualizarUsuariosEnWebSocket(response);
      },
      error => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  actualizarUsuariosEnWebSocket(usuario: Usuario) {
    // Enviar el usuario recién creado al WebSocket
    this.socketService.getUserSubject().next(usuario);
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

  connectToSocket() {
    const roomId = 'sala1'; // Puedes ajustar el ID de la sala según tu lógica
    this.socketService.joinRoom(roomId);

    this.socketService.getMessageSubject().subscribe((messages: Usuario[]) => {
      console.log('Mensajes del socket:', messages);
      // Puedes agregar lógica adicional aquí según los mensajes recibidos
      if (messages.length > 0) {
        this.obtenerUsuarios(); // Actualiza la lista si se recibe un mensaje del socket
      }
    });
  }
}

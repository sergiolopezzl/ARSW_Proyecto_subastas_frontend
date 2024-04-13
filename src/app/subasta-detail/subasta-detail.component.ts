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
  subasta: Subastas | null = null; // Cambiar el tipo a Subastas | null\
  usuarios: Usuario[] = [];
  mostrarDetalleSubasta = false;

  constructor(private subastasService: SubastasService, private route: ActivatedRoute, private socketService: SocketService) {}

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

    //setInterval(() => {
    //  location.reload();
    //}, 10000); // Recargar la página cada 30 segundos (30000 milisegundos)
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

   // Función para verificar si la subasta actual es la que estamos buscando
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

  pujar() {
    // Lógica para pujar en la subasta

  }




}

import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { Usuario } from './usuario/usuario';
import { UsuariosService } from './usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private stompClient: any;
  private messageSubject: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  private userSubject: Subject<Usuario> = new Subject<Usuario>();
  private usuariosSubject: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  private subscriptionCounter: number = parseInt(localStorage.getItem('subscriptionCounter') || '0'); // Recuperar contador del almacenamiento local
  private subscriptionInfoSubject: Subject<{ subscriptionId: string, roomId: string }> = new Subject<{ subscriptionId: string, roomId: string }>();

  constructor(private usuarioService: UsuariosService) {
    this.initConnenctionSocket();
  }

  initConnenctionSocket() {
    const url = '//localhost:3000/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(() => socket);
  }

  joinRoom(roomId: string) {
    const subscriptionId = `sub-${this.subscriptionCounter++}`;
    localStorage.setItem('subscriptionCounter', this.subscriptionCounter.toString());

    this.stompClient.connect({}, () => {
      const usuarioNuevo: Usuario = {
        id: 2,
        nombre: `usuario${subscriptionId}`,
        contrasena: "123",
        saldo: 100000,
        correoElectronico: "43",
        idDeApuesta: 3,
        gasto: 0
      };

      // Guardar el usuario en la base de datos al conectar al WebSocket
      this.guardarUsuario(usuarioNuevo);

      // Suscribirse al topic y manejar mensajes
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);
        this.messageSubject.next(currentMessage);

        console.log('Mensaje WebSocket recibido:');
        console.log(JSON.stringify(messageContent, null, 2));

        if (messageContent.usuarios) {
          const currentUsuarios = this.usuariosSubject.getValue();
          const nuevosUsuarios = messageContent.usuarios.filter((usuario: Usuario) =>
            !currentUsuarios.some((u: Usuario) => u.id === usuario.id)
          );
          currentUsuarios.push(...nuevosUsuarios);
          this.usuariosSubject.next(currentUsuarios);

          // No es necesario guardar nuevamente los usuarios nuevos en este punto
        }
      }, { id: subscriptionId });

      this.subscriptionInfoSubject.next({ subscriptionId, roomId });
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.crearUsuario(usuario).subscribe(
      response => {
        console.log('Usuario creado:', response);
      },
      error => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  sendMessage(roomId: string, chatMessage: Usuario) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  getUserSubject() {
    return this.userSubject;
  }

  getUsuariosSubject() {
    return this.usuariosSubject.asObservable();
  }

  getSubscriptionInfoSubject() {
    return this.subscriptionInfoSubject.asObservable();
  }
}

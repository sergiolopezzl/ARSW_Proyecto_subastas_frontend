import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { Usuario } from './usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private stompClient: any
  private messageSubject: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  private userSubject: Subject<Usuario> = new Subject<Usuario>(); // Nuevo Subject
  private usuariosSubject: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);

  constructor() {
    this.initConnenctionSocket();
  }

  initConnenctionSocket() {
    const url = '//localhost:3000/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(() => socket);
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);
        this.messageSubject.next(currentMessage);

        // Imprimir el mensaje JSON de forma legible en la consola
        console.log('Mensaje WebSocket recibido:');
        console.log(JSON.stringify(messageContent, null, 2)); // Indentación de 2 espacios

        if (messageContent.usuarios) {
          const currentUsuarios = this.usuariosSubject.getValue();
          currentUsuarios.push(...messageContent.usuarios);
          this.usuariosSubject.next(currentUsuarios);
        }
      })
    })
  }

  sendMessage(roomId: string, chatMessage: Usuario) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }
  getUserSubject() {
    return this.userSubject;
  }
  getUsuariosSubject() {
    return this.usuariosSubject.asObservable();
  }
}

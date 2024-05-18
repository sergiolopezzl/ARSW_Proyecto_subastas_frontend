import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WebSocketProductService {

  private stompClient: any;
  public newOffer: Subject<any> = new Subject<any>();

  constructor() { }

  innitConnectionSocket(roomId: string){
    const url = 'http://localhost:80/auction-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/offerMade${roomId}`, (offer: { body: string }) => {
        const offerData: any = JSON.parse(offer.body);
        console.log('Received offer:', offerData);
        this.newOffer.next(offerData);
      });
    });
  }

}

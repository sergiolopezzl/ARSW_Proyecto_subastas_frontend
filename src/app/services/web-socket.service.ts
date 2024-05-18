import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Product } from '../models/product';
import { ProductOffer } from '../models/productOffer';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  public newOffer: Subject<any> = new Subject<any>();
  public newProduct: Subject<any> = new Subject<any>();
  public newFetch: Subject<any> = new Subject<any>();

  constructor() {
   }

  innitConnectionSocket(){
    const url = 'http://localhost:80/auction-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

  
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/auctionCreated', (product: { body: string }) => {
        const productData: Product = JSON.parse(product.body);
        this.newProduct.next(productData);
      })
    });
  }

  joinRoom(roomId: string) :void {
    this.stompClient.subscribe('/topic/offerMade/{roomId}', (offer: { body: string }) => {
      const offerData: Product = JSON.parse(offer.body);
      console.log('Received data:', offerData);
      this.newOffer.next(offerData);
    });

  }
}

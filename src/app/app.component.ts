import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { WebSocketProductService } from './services/web-socket-product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'front';

  constructor(private WebSocketService:WebSocketService){}

  ngOnInit(){
    this.WebSocketService.innitConnectionSocket();
  }
}
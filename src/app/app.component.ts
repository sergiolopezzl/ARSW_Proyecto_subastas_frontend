import { GgComponent } from './gg/gg.component';
import { Component } from '@angular/core';
import { ListaSubastasComponent } from './lista-subastas/lista-subastas.component';


@Component({
  standalone:false,
  //imports: [GgComponent,ListaSubastasComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'subastas-frontend';
}

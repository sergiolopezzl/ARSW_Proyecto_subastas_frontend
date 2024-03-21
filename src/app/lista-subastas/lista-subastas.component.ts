import { SubastasService } from '../subastas/subastas.service';
import { Subastas } from '../subastas/subastas';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lista-subastas',
  templateUrl: './lista-subastas.component.html',
  styleUrls: ['./lista-subastas.component.css']
})
export class ListaSubastasComponent implements OnInit {

  subastas:Subastas[];
  constructor(private subastasService:SubastasService){}

  ngOnInit(): void {
    this.obtenerSubastas();
  }

  private obtenerSubastas(){
    this.subastasService.obtenerListaSubastas().subscribe(dato => {
      this.subastas = dato;
    });
  }
}

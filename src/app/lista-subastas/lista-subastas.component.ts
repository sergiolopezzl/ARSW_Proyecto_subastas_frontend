import { SubastasService } from '../subastas/subastas.service';
import { Subastas } from '../subastas/subastas';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-subastas',
  templateUrl: './lista-subastas.component.html',
  styleUrls: ['./lista-subastas.component.css']
})
export class ListaSubastasComponent implements OnInit {

  subastas: Subastas[];
  idSubastaSeleccionada: string | null = null; // Variable para almacenar el ID seleccionado

  constructor(private subastasService: SubastasService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerSubastas();
  }

  private obtenerSubastas() {
    this.subastasService.obtenerListaSubastas().subscribe(dato => {
      this.subastas = dato;
    });
  }

  guardarIdSubasta(id: string | number) {
    this.idSubastaSeleccionada = String(id); // Convierte a cadena usando String()
    this.router.navigate(['/subasta', this.idSubastaSeleccionada]);
  }

}

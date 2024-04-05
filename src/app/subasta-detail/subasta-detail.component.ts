import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubastasService } from '../subastas/subastas.service';
import { Subastas } from '../subastas/subastas'; // Asegúrate de importar el modelo correcto

@Component({
  selector: 'app-subasta-detail',
  templateUrl: './subasta-detail.component.html',
  styleUrls: ['./subasta-detail.component.css']
})
export class SubastaDetailComponent implements OnInit {
  subastas: Subastas[] = [];
  subastaId: number | null = null;
  subasta: Subastas | undefined;

  constructor(private subastasService: SubastasService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subastaId = +params['id']; // Convierte el parámetro de la URL a número
      this.obtenerSubastas();
      this.cargarSubasta();
    });
  }

  obtenerSubastas() {
    this.subastasService.obtenerListaSubastas().subscribe(
      (datos: Subastas[]) => {
        this.subastas = datos;
      },
      error => {
        console.error('Error al obtener las subastas:', error);
      }
    );
  }

  cargarSubasta() {
    if (this.subastaId !== null && this.subastas.length > 0) {
      this.subasta = this.subastas.find(item => item.id === this.subastaId);
    }
  }

   // Función para verificar si la subasta actual es la que estamos buscando
   esSubastaCorrecta(subasta: Subastas): boolean {
    return subasta.id === this.subastaId;
  }

}

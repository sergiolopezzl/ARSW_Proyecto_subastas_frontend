import { Component } from '@angular/core';
import { Subastas } from '../subastas/subastas'; // Importa la clase Subastas
import { SubastasService } from '../subastas/subastas.service'; // Importa el servicio SubastasService

@Component({
  selector: 'app-crear-subasta',
  templateUrl: './crear-subasta.component.html',
  styleUrls: ['./crear-subasta.component.css']
})
export class CrearSubastaComponent {
  subasta: Subastas = new Subastas(); // Instancia de una nueva subasta

  constructor(private subastasService: SubastasService) { }

  crearSubasta() {
    this.subastasService.crearSubasta(this.subasta).subscribe(
      response => {
        console.log('Subasta creada:', response);
        // Puedes agregar redireccionamiento o lógica adicional aquí
      },
      error => {
        console.error('Error al crear subasta:', error);
        // Puedes agregar manejo de errores aquí
      }
    );
  }
}

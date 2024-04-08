// crud-subastas.component.ts
import { Component, OnInit } from '@angular/core';
import { Subastas } from './../subastas/subastas'; // Importa la clase Subastas
import { SubastasService } from './../subastas/subastas.service'; // Importa el servicio SubastasService

@Component({
  selector: 'app-crud-subastas',
  templateUrl: './crud-subastas.component.html',
  styleUrls: ['./crud-subastas.component.css']
})
export class CrudSubastasComponent implements OnInit {
  subastas: Subastas[] = [];
  subasta: Subastas = new Subastas();

  constructor(private subastasService: SubastasService) { }

  ngOnInit(): void {
    this.obtenerSubastas();
  }

  obtenerSubastas() {
    this.subastasService.obtenerListaSubastas().subscribe(
      (data: Subastas[]) => {
        this.subastas = data;
      },
      error => {
        console.error('Error al obtener subastas:', error);
      }
    );
  }

  guardarSubasta() {
    if (this.subasta.id) {
      this.actualizarSubasta(this.subasta.id, this.subasta);
    } else {
      this.crearSubasta(this.subasta);
    }
  }

  crearSubasta(subasta: Subastas) {
    this.subastasService.crearSubasta(subasta).subscribe(
      response => {
        console.log('Subasta creada:', response);
        this.obtenerSubastas(); // Actualiza la lista después de guardar
        this.limpiarFormulario();
      },
      error => {
        console.error('Error al crear subasta:', error);
      }
    );
  }

  actualizarSubasta(id: number, subasta: Subastas) {
    this.subastasService.actualizarSubasta(id, subasta).subscribe(
      response => {
        console.log('Subasta actualizada:', response);
        this.obtenerSubastas(); // Actualiza la lista después de guardar
        this.limpiarFormulario();
      },
      error => {
        console.error('Error al actualizar subasta:', error);
      }
    );
  }

  editarSubasta(subasta: Subastas) {
    this.subasta = {...subasta }; // Copia la subasta para editar en el formulario
  }

  eliminarSubasta(id: number) {
    if (confirm('¿Está seguro de eliminar esta subasta?')) {
      this.subastasService.eliminarSubasta(id).subscribe(
        response => {
          console.log('Subasta eliminada:', response);
          this.obtenerSubastas(); // Actualiza la lista después de eliminar
        },
        error => {
          console.error('Error al eliminar subasta:', error);
        }
      );
    }
  }

  limpiarFormulario() {
    this.subasta = new Subastas(); // Reinicia el objeto subasta para crear una nueva
  }
}

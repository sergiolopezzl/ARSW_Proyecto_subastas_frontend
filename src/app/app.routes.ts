import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearSubastaComponent } from './crear-subasta/crear-subasta.component'; // Importa el componente de la página "crear"

const routes: Routes = [
  // Otras rutas existentes...
  { path: 'crear', component: CrearSubastaComponent }, // Define la ruta para la página "crear"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

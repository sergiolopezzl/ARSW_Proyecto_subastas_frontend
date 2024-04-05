import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearSubastaComponent } from './crear-subasta/crear-subasta.component';
import { ListaSubastasComponent } from './lista-subastas/lista-subastas.component';
import { SubastaDetailComponent } from './subasta-detail/subasta-detail.component';

const routes: Routes = [
  // Otras rutas existentes...
  { path: 'crear', component: CrearSubastaComponent },
  { path: 'lista', component: ListaSubastasComponent },
  { path: 'subasta/:id', component: SubastaDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

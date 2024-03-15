import { Routes } from '@angular/router';
import { ListaSubastasComponent } from './lista-subastas/lista-subastas.component';

export const routes: Routes = [
  { path: '', redirectTo: '/subastas', pathMatch: 'full' }, // Redirige al componente de subastas por defecto
  { path: 'subastas', component: ListaSubastasComponent }, // Ruta para mostrar la lista de subastas
  // Puedes agregar más rutas aquí según las necesidades de tu aplicación
];

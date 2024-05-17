import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CrearSubastaComponent } from './crear-subasta/crear-subasta.component';
import { ListaSubastasComponent } from './lista-subastas/lista-subastas.component';
import { SubastaDetailComponent } from './subasta-detail/subasta-detail.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrudSubastasComponent } from './crud-subastas/crud-subastas.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  // Otras rutas existentes...
  { path: 'crear', component: CrudSubastasComponent },
  { path: 'lista', component: ListaSubastasComponent },
  { path: 'subasta/:id', component: SubastaDetailComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'chat/:userId', component: ChatComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

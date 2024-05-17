import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaSubastasComponent} from "./lista-subastas/lista-subastas.component";
import { NavbarComponent } from './navbar/navbar.component';
import { CrearSubastaComponent } from './crear-subasta/crear-subasta.component';
import { HttpClientModule } from '@angular/common/http';
import { SubastaDetailComponent } from './subasta-detail/subasta-detail.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrudSubastasComponent } from './crud-subastas/crud-subastas.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { SocketIoModule} from 'ngx-socket-io';
import { ChatComponent } from './components/chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    ListaSubastasComponent,
    NavbarComponent,
    CrearSubastaComponent,
    SubastaDetailComponent,
    UsuariosComponent,
    CrudSubastasComponent,
    ListaUsuariosComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule
  ],
  providers: [
    //provideClientHydration()
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

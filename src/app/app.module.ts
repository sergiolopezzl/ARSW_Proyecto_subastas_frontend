import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ListaSubastasComponent} from "./lista-subastas/lista-subastas.component";
import { NavbarComponent } from './navbar/navbar.component';
import { CrearSubastaComponent } from './crear-subasta/crear-subasta.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListaSubastasComponent,
    NavbarComponent,
    CrearSubastaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    //provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

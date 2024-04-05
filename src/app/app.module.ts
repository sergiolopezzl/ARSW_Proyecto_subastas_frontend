import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ListaSubastasComponent} from "./lista-subastas/lista-subastas.component";
import { NavbarComponent } from './navbar/navbar.component';
import { CrearSubastaComponent } from './crear-subasta/crear-subasta.component';
import { HttpClientModule } from '@angular/common/http';
import { SubastaDetailComponent } from './subasta-detail/subasta-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaSubastasComponent,
    NavbarComponent,
    CrearSubastaComponent,
    SubastaDetailComponent
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

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ListaSubastasComponent } from './lista-subastas/lista-subastas.component';
import { HttpClientModule } from '@angular/common/http';
import { GgComponent } from './gg/gg.component';


@NgModule({
  declarations: [
    AppComponent,
    GgComponent,
    ListaSubastasComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  exports:[
    GgComponent,
    AppComponent,
    ListaSubastasComponent
  ],
  bootstrap: [AppComponent] // AppComponent es el componente principal de arranque
})
export class AppModule { }

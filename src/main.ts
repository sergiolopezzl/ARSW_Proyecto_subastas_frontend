import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { ListaSubastasComponent } from './app/lista-subastas/lista-subastas.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

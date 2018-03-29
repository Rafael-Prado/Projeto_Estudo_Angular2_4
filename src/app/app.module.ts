import './util/rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DialogService } from './dialog.service';

import { AppComponent } from './app.component';
import { AppRountingModule } from './app-routing.module';
import { ContatosModule } from './Contatos/contatos.module';
import { InMemoryDataService } from './in.memory.data.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRountingModule,
    BrowserModule,
    ContatosModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

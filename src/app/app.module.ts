import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {APP_CONFIG, AppConfig} from './config/app.config'
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/customers.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CustomersComponent,
    ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

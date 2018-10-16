import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent } from './app.component';
import {APP_CONFIG, AppConfig} from './config/app.config'
import {/*HttpClient,*/ HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {environment} from '../environments/environment';
import {PagesModule} from './pages/pages.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './shared/shared.module';
import {NavService} from './nav.service';
import {CustomersModule} from './modules/customers/customers.module';
//import {CustomersRoutingModule} from './modules/customers/customers-routing.module';

//jwt
import { JwtInterceptor, ErrorInterceptor } from './pages/_helpers';
import {DynamicformModule} from './modules/dynamicform/dynamicform.module';
import {JpFormsModule} from './forms/jp-forms.module';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    PagesModule,
    FlexLayoutModule,
    SharedModule,
    CustomersModule,
    ReactiveFormsModule,
    DynamicformModule,
    JpFormsModule,
  ],
  declarations: [
    AppComponent,
    ],
  exports: [
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    NavService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

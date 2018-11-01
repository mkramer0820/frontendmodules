import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent } from './app.component';
import {APP_CONFIG, AppConfig} from './config/app.config'
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PagesModule} from './pages/pages.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './shared/shared.module';
import {NavService} from './nav.service';
import {CustomersModule} from './modules/customers/customers.module';
import { JwtInterceptor, ErrorInterceptor } from './pages/_helpers';
import {DynamicformModule} from './modules/dynamicform/dynamicform.module';
import {JpFormsModule} from './forms/jp-forms.module';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DatetimeFormat, DateFormat } from './_pipes/datetime.pipe';
import { MessageService } from './_services/message.service';
import { PostService } from './_services/post.service';
import { HttpClientInterceptorService } from './_injectors/http-client-interceptor.service';


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
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  declarations: [
    AppComponent,
    DatetimeFormat,
    DateFormat,
    ],
  exports: [
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // {
    //      provide: HTTP_INTERCEPTORS,
    //      useClass: HttpClientInterceptorService,
    //      multi: true
    //  },
    NavService,
    MessageService,
    PostService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

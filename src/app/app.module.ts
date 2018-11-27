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
import { HttpClientInterceptorService } from './_injectors/http-client-interceptor.service';
import {DeleteModalComponent} from './_helpers/delete-modal/delete-modal.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';







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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [
    AppComponent,
    DatetimeFormat,
    DateFormat,
    DeleteModalComponent,
    ],
  exports: [
    DeleteModalComponent
  ],
  entryComponents: [
    DeleteModalComponent
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    NavService,
    MessageService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

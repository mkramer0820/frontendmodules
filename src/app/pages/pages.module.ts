import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalService} from './_services/modal.service';
import { ModalComponent } from './_directives/modal/modal.component';
import { DatePickerComponent } from '../_util/date-picker/date-picker/date-picker.component';

import { SweaterSizeComponent } from './sweater-size/sweater-size.component';
import { SweaterSizeUpdateComponent } from './sweater-size/sweater-size-update/sweater-size-update.component';

import {JpFormsModule} from 'app/forms/jp-forms.module';
import {AppRoutingModule} from '../app-routing.module';
import {CustomerModule} from './customer/customer.module';
import {FactoryModule} from './factory/factory.module';
import { TaskCalendarModule } from './task-calendar/task-calendar.module';
import {OrdersModule} from './orders/orders.module';
import {TaskModule} from './task/task.module';
import {LoginModule} from './login/login.module';



@NgModule({
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    TaskCalendarModule,
    JpFormsModule,
    CustomerModule,
    FactoryModule,
    OrdersModule,
    TaskModule,
    LoginModule,
  ],
  declarations: [
    ModalComponent,
    DatePickerComponent,
    SweaterSizeComponent,
    SweaterSizeUpdateComponent,
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ModalService,

  ],
})
export class PagesModule { }

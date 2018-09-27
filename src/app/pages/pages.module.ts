import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerAddFormComponent} from './customer/customer-add/customer-add-form.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';
import { OrdersAddComponent } from './orders/orders-add/orders-add.component';
import { OrdersUpdateComponent } from './orders/orders-update/orders-update.component';
import { LoginComponent } from './login/login.component';
//import {SharedService} from './customer/shared.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { FactoryComponent } from './factory/factory.component';
import { FactoryTableComponent } from './factory/factory-table/factory-table.component';
import { FactoryAddComponent } from './factory/factory-add/factory-add.component';
import { FactoryUpdateComponent } from './factory/factory-update/factory-update.component';
import { FactoryContactComponent } from './factory/factory-contact/factory-contact.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TaskComponent } from './task/task.component';
import { TasksetComponent } from './task/taskset/taskset.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    CustomerAddFormComponent,
    CustomerComponent,
    CustomerTableComponent,
    CustomerUpdateComponent,
    OrdersTableComponent,
    OrdersAddComponent,
    OrdersUpdateComponent,
    LoginComponent,
    FactoryComponent,
    FactoryTableComponent,
    FactoryAddComponent,
    FactoryUpdateComponent,
    FactoryContactComponent,
    TaskComponent,
    TasksetComponent,
    //OrdersImageUploadComponent,
  ],
  entryComponents: [
    CustomerAddFormComponent,
    CustomerUpdateComponent,
    FactoryAddComponent,
    FactoryUpdateComponent,
  ],
  exports: [
    CustomerAddFormComponent,
    CustomerTableComponent,
    CustomerUpdateComponent,
    OrdersTableComponent,
    OrdersAddComponent,
    OrdersUpdateComponent,
    FactoryTableComponent,
    FactoryAddComponent,
    FactoryUpdateComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
})
export class PagesModule { }

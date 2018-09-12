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

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
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
    //OrdersImageUploadComponent,
  ],
  entryComponents: [
    CustomerAddFormComponent,
    CustomerUpdateComponent,
  ],
  exports: [
    CustomerAddFormComponent,
    CustomerTableComponent,
    CustomerUpdateComponent,
    OrdersTableComponent,
    OrdersAddComponent,
    OrdersUpdateComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
})
export class PagesModule { }

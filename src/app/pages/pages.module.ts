import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerAddFormComponent} from './customer/customer-add/customer-add-form.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';
import { OrdersAddComponent } from './orders/orders-add/orders-add.component';
import { OrdersUpdateComponent } from './orders/orders-update/orders-update.component';
//import {SharedService} from './customer/shared.service';


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
    OrdersComponent,
    OrdersTableComponent,
    OrdersAddComponent,
    OrdersUpdateComponent,
  ],
  entryComponents: [
    CustomerAddFormComponent,
    CustomerUpdateComponent,
  ],
  exports: [
    CustomerAddFormComponent,
    CustomerTableComponent,
    CustomerUpdateComponent,
    OrdersComponent,
    OrdersComponent,
    OrdersTableComponent,
    OrdersAddComponent,
    OrdersUpdateComponent,
  ],
  providers: [],
})
export class PagesModule { }

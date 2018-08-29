import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerAddFormComponent} from './customer/customer-add/customer-add-form.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
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
  ],
  entryComponents:[
    CustomerAddFormComponent,
    CustomerUpdateComponent,
  ],
  exports: [
    CustomerAddFormComponent,
    CustomerTableComponent,
    CustomerUpdateComponent,
  ],
  providers: [],
})
export class PagesModule { }

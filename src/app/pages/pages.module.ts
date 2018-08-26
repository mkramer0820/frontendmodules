import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {CustomerAddComponent, CustomerAddDialogComponent} from './customer/customer-list/customer-list.component';
import {CustomerAddFormComponent} from './customer/customer-add/customer-add-form.component';
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [
    CustomerListComponent,
    //CustomerAddDialogComponent,
    //CustomerAddComponent,
    CustomerAddFormComponent,
    CustomerComponent,
  ],
  entryComponents:[
    //CustomerAddDialogComponent,
    //CustomerAddComponent,
    CustomerAddFormComponent,
  ],
  exports: [
    CustomerListComponent,
    //CustomerAddDialogComponent,
    //CustomerAddComponent,
    CustomerAddFormComponent,
  ]
})
export class PagesModule { }

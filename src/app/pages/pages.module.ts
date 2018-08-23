import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerAddComponent, CustomerAddDialogComponent} from './customer/customer-list/customer-list.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [
    CustomerListComponent,
    CustomerAddDialogComponent,
    CustomerAddComponent,
  ],
  exports: [
    CustomerListComponent,
  ]
})
export class PagesModule { }

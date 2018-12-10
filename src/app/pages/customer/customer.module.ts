import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerTableComponent} from './customer-table/customer-table.component';
import {SharedModule} from 'app/shared/shared.module';
import {CustomerComponent} from './customer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CustomerTableComponent,
    CustomerComponent,
  ],
  exports: [
    CustomerTableComponent,
  ]
})
export class CustomerModule { }

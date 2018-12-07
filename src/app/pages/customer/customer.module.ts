import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerTableComponent} from './customer-table/customer-table.component';
import {SharedModule} from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CustomerTableComponent,
  ],
  exports: [
    CustomerTableComponent,
  ]
})
export class CustomerModule { }

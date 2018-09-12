import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { SharedModule } from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,

  ],
  declarations: [
    CustomersComponent
  ],
  exports: [
  ],
  providers: [

  ]

})
export class CustomersModule { }

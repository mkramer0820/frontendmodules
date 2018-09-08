import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
//import { CustomersService} from './customers.service';
import { SharedModule } from '../../shared/shared.module';
import { CustomersRoutingModule } from './/customers-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    CustomersRoutingModule,
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

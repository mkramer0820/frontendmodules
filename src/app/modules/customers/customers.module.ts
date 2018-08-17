import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { CustomersService} from './customers.service';
import { SharedModule } from '../../shared/shared.module';
import { CustomersRoutingModule } from './/customers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }

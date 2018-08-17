import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomersService} from '../../customers.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }

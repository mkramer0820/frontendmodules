import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FactoryTableComponent} from './factory-table/factory-table.component';
import {FactoryContactComponent} from './factory-contact/factory-contact.component';
import {SharedModule} from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    FactoryContactComponent,
    FactoryTableComponent,
  ]
})
export class FactoryModule { }

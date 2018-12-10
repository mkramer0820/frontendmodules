import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FactoryTableComponent} from './factory-table/factory-table.component';
import {FactoryContactComponent} from './factory-contact/factory-contact.component';
import {SharedModule} from 'app/shared/shared.module';
import {FactoryComponent} from './factory.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    FactoryContactComponent,
    FactoryTableComponent,
    FactoryComponent,
  ]
})
export class FactoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component' 
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserModule } from '@angular/platform-browser';
import { TableService } from './_service/table.service';
import {SharedModule} from 'app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    BrowserModule,
    SharedModule,
  ],
  declarations: [
    TableComponent
  ],
  providers: [TableService]

})
export class TableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule} from "@angular/material";
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientService} from "app/_services/http-client.service";
import {TableService} from './_service/table-service.service';
import {TableComponent} from './table.component';
import {SharedModule} from 'app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    SharedModule,
    CdkTableModule,
  ],
  declarations: [TableComponent],
  providers: [TableService],
})
export class TableModule { }

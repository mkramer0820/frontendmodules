import { Component, OnInit, ViewChild } from '@angular/core';
import {TableService} from './_service/table.service'
import {BehaviorSubject, pipe, Observable} from 'rxjs';
import { mergeMap, groupBy, reduce, toArray, map, first } from 'rxjs/operators';
import {MatSort, MatTableDataSource, MatTable, MatPaginator} from '@angular/material';


import {combineLatest} from 'rxjs/operators';
import { Result } from './_models/ipaginator';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from 'app/config/app.config';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  base = AppConfig.base
  url = AppConfig.base + AppConfig.urlOptions.orders

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: Array<string> = ['id', 'buyer_name', 'customer_order_number', 'buyer_style_number',
                              'jp_style_number', 'factory_name', 'due_date', 'factory_ship_date', 
                              'qty', 'sweater_image', 'cost_from_factory', 'buyers_price']
  // displayedColumns: String[] = []


  constructor(private ts: TableService, private http: HttpClient) { this.ts.getPaginatorOrder() }

  ngOnInit() {

    this.ts.dataSource.subscribe(dataSource => {
      this.dataSource = new MatTableDataSource(dataSource)
      this.dataSource.sort = this.sorted();
      this.dataSource.paginator = this.paginator;
    })
  }
  sorted() {
    return this.dataSource.sort = this.sort
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

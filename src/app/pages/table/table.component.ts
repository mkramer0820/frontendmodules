import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClientService} from 'app/_services/http-client.service'
import {AppConfig} from 'app/config/app.config'
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Iorder} from "./_models/iorder";
import {TableService} from "./_service/table-service.service";
import {pipe, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, startWith, tap, delay, map} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {fromEvent} from 'rxjs/observable/fromEvent';
import {TableDataSource} from "./_service/table.datasource";
import {Order} from "./_models/orders.model";
import {Result} from './_service/table-service.service';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  dataSource: TableDataSource;
  params= new UrlParameters();
  order: Result[];
  displayColumns = ["id", "buyer", "factory", "due_date", "factory_ship_date", "sweater_image", "size", "isActive", "customer_order_number", "buyer_style_number", "jp_style_number", "cost_from_factory", "buyers_price", "order_type", "qty", "sweater_description", "brand", "fiber_content", "jp_care_instructions", "color"]
  data: Array<Array<any>>
  cols: Array<any>
  rows: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;
  page = 0

  constructor(private http: HttpClientService,
              private route: ActivatedRoute,
              private tableService: TableService) {}

  ngOnInit() {
        this.dataSource = new TableDataSource(this.tableService);

    this.dataSource = new TableDataSource(this.tableService);
    this.dataSource.loadOrders(this.params);
    this.dataSource.orderData.subscribe(orders=> {
      this.data = orders
      this.cols = orders[0].cols
      return this.data = orders
    });
    console.log(this.data)    
   
  }
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.params.page = 0);
    


    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadOrders())
    )
    .subscribe();
  }
  loadOrders() {
    this.dataSource.loadOrders(this.params)
  }



  }

  export class UrlParameters {

    buyer?: string;
    dueDateBefore?: string;
    dueDateAfter?: string;
    ordering?: string;
    buyerStyle?: string;
    jpStyle?:string;
    isActive?: boolean;
    page?: number;
    pageSize?: number;
    currentPage?: number;
    length?: number;
    djangoPageNumber: number;
   
    constructor(options: {
        
        ordering?: string;
        buyer?: string;
        dueDateBefore?: string;
        dueDateAfter?: string;
        buyerStyle?: string;
        jpStyle?:string;
        isActive?: boolean;
        page?: number;
        pageSize?: number;
        currentPage?: number;
        length?: number;
        djangoPageNumber? : number;
         } = {}) {
      this.ordering = options.ordering || 'id';
      this.buyer = options.buyer || '';
      this.dueDateBefore = options.dueDateBefore || '';
      this.dueDateAfter = options.dueDateAfter || '';
      this.buyerStyle = options.buyerStyle || '';
      this.jpStyle = options.jpStyle || '';
      this.isActive = options.isActive || true;
      this.page = options.page || 0;
      this.pageSize = options.pageSize || 5;
      this.currentPage = options.currentPage || 0;
      this.length = options.length || 100;
      this.djangoPageNumber = options.djangoPageNumber || 1;
      }
    
    updateToDjango(pageNum: number) {
        this.djangoPageNumber = pageNum;
    }
    
      
  }
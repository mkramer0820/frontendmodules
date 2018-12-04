import { Component, OnInit, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {FilterFormService} from '../../_service/';
import { catchError} from 'rxjs/operators';
import {Order} from '../../../pages/orders/orders-table/_service/order.service'
import {formatDate} from '@angular/common';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormComponent} from '../form/form.component';
import { FormControlService }    from '../../_service/form-control.service';
import {FormGroup} from '@angular/forms';
import {OrderService} from '../../../pages/orders/orders-table/_service/order.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { isType } from '@angular/core/src/type';
import {DynamicFormRequestComponent} from '../dynamic-form-request/dynamic-form-request.component';
import {AppConfig} from "app/config/app.config";
import {MatDialog} from "@angular/material";

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  providers: [FormControlService, FilterFormService]
})
export class FilterFormComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  models: any;
  formModel: any;
  @Output() filtersEvent = new EventEmitter<any>();
  filtermessage = 'Hola Mundo!';
  orderSort: string = '';
  orders: any;
  order: Order[];
  opt: any[] = [''];
  totalCost: any = {};
  pageSize: number;
  length: number;


  constructor(
     private ffs: FilterFormService,
     private fcs: FormControlService,
     private dialog: MatDialog,

     private ordersService: OrderService) { this.models = this.getForm();
  }

  ngOnInit() {

    this.ordersService.currentOrders.subscribe(orders => {
      this.order = orders;
      for (let order in this.order) {
        this.opt.push(this.order[order]['buyer_name'])
      }
      this.opt = this.opt.filter((v, i, a) => a.indexOf(v) === i); 
    });
    this.models = this.getForm(this.opt);
    this.filterForm = this.fcs.toFormGroup(this.models);
  }
  ngAfterViewInit() {
   // this.filters = this.filters.form.value
  }
  getForm(options?) {
    return this.ffs.getForms(options);
  }
  sentFilters(event: any) {
    this.filtersEvent.emit(event);
  }
  onSubmit() {
    
    let start = this.filterForm.value['start_date'];
    let end = this.filterForm.value['end_date']
    
    if (start instanceof(_moment)) {
      console.log(start instanceof(_moment))
      this.ordersService.url.dueDateAfter = moment(this.filterForm.value['start_date']).format("YYYY-MM-DD")
     } else if (start === null || '') {  this.ordersService.url.dueDateAfter = '' }
    if (end instanceof(_moment)) {
      this.ordersService.url.dueDateBefore = moment(this.filterForm.value['end_date']).format("YYYY-MM-DD")
      } else if (end === null || '') {  this.ordersService.url.dueDateBefore = '' }

    this.ordersService.url.jpStyle = this.filterForm.value['jp_style_number'];
    this.ordersService.url.buyerStyle = this.filterForm.value['buyer_style_number'];
    this.ordersService.url.buyer = this.filterForm.value['buyers'];
    this.ordersService.url.isActive = this.filterForm.value['isActive'];

    console.log(this.ordersService.url)

    
    this.ordersService.findPaginatedOrders();
  }
  getTotalCost(order) {
    this.totalCost['jpCost'] = order.map(t => t.qty * t.cost_from_factory).reduce((acc, value) => acc + value, 0);
    this.totalCost['buyerCost'] = order.map(t => t.qty * t.buyers_price).reduce((acc, value) => acc + value, 0);
    this.totalCost['simpleProfit'] = this.totalCost.buyerCost  - this.totalCost.jpCost;
    return this.totalCost;
  }
  options(orders) {
    let options = []
    orders.forEach(function (buyer_name) {
    })
    for (let order of orders) {
      options.push(order.buyer_name)
    }
    return options;
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      height: '800px',
      data: {url: AppConfig.urlOptions.orders, order: this.order, update: false}
    });
    dialogRef.afterClosed().subscribe((orders: Order[]) => {
      this.ordersService.findPaginatedOrders();
      this.ordersService.currentOrders.subscribe((orders: Order[]) => {
        this.orders = orders;
        this.length = this.ordersService.url.length;
        this.pageSize = this.ordersService.url.pageSize;
        this.getTotalCost(orders)
  
       })
    })
  }
  openSweaterSizeDialog(update?: boolean): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.sweaterSizes , update: update}
    });
    dialogRef.afterClosed().subscribe((orders: Order[]) => {
      this.ordersService.findPaginatedOrders();
      
    })
  }
}


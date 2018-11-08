import { Component, OnInit, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {FilterFormService} from '../../_service/';
import { catchError} from 'rxjs/operators';
import {Order} from '../../../modules/models/orders.model';
import {formatDate} from '@angular/common';
import {of} from 'rxjs';
import {FormComponent} from '../form/form.component';
import { FormControlService }    from '../../_service/form-control.service';
import {FormGroup} from '@angular/forms';
import {OrderService} from '../../../pages/orders/orders-table/_service/order.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

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

  @Input() filterForm: FormGroup;
  models: any;
  @Output() filtersEvent = new EventEmitter<any>();
  filtermessage = 'Hola Mundo!';
  orderSort: string = '';
  orders: Order[];

  @Input() options: any;
  constructor( private ffs: FilterFormService, private fcs: FormControlService, private ordersService: OrderService) { this.models = this.getForm();
  }

  ngOnInit() {
    this.models = this.getForm();
    this.filterForm = this.fcs.toFormGroup(this.models)
    this.onSubmit();
  }
  ngAfterViewInit() {
   // this.filters = this.filters.form.value
  }
  totalCost: any = {};


  getForm() {
    return this.ffs.getForms(this.options)
  }    
  sentFilters(event: any) {
    this.filtersEvent.emit(event)
  
  }
  onSubmit() { 
    let ordering = ''
    let dueDateBefore: string;
    if (this.filterForm.value['start_date'] != '') {
      dueDateBefore =  moment(this.filterForm.value['start_date']).format('YYYY-MM-DD');
    } else { dueDateBefore = ''};
    let dueDateAFter: string;
    if (this.filterForm.value['end_date'] != '') {
      dueDateAFter =  moment(this.filterForm.value['end_date']).format('YYYY-MM-DD');
    } else { dueDateAFter = ''};


    let buyer = this.filterForm['buyer'] || '';
    let buyerStyle = this.filterForm.value['buyer_style_number'] || '';
    let jpStyle = this.filterForm.value['jp_style_number'] || '';
    
    if (this.orderSort === '-') {
      let values = this.filterForm.value;
      let order = this.orderSort + 'id';
      this.orderSort=''

      this.ordersService.findOrders(buyer, dueDateBefore, dueDateAFter, ordering, buyerStyle, jpStyle).pipe(
        catchError(() => of([])),
      )
      .subscribe((orders: Order[]) => {
  
        console.log(orders)
        this.orders = orders;
        this.getTotalCost(orders);
        this.sentFilters(this.orders);
      });
    } else if (this.orderSort === '') {

      this.ordersService.findOrders(buyer, dueDateBefore, dueDateAFter, ordering, buyerStyle, jpStyle).pipe(
        catchError(() => of([])),
      )
      .subscribe((orders: Order[]) => {
  
        console.log(orders)
        this.orders = orders;
        this.getTotalCost(orders);
        this.orderSort='-'
        this.sentFilters(this.orders);
      });
    }
  }
  getTotalCost(order) {
    this.totalCost['jpCost'] = order.map(t => t.qty * t.cost_from_factory).reduce((acc, value) => acc + value, 0);
    this.totalCost['buyerCost'] = order.map(t => t.qty * t.buyers_price).reduce((acc, value) => acc + value, 0);
    this.totalCost['simpleProfit'] = this.totalCost.buyerCost  - this.totalCost.jpCost;
    console.log(this.totalCost);
    return this.totalCost;
  }
}

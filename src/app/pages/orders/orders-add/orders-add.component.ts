import { Component, OnInit } from '@angular/core';
import {Order} from '../../../modules/models/orders.model';
import {FormBuilder, FormControl} from '@angular/forms';
import {ApiService} from '../../../config/api.service';
import {Customer} from '../../../modules/models/customer.model';
import {Factory} from '../../../modules/models/factory.model';
import { Observable } from 'rxjs';
import {VERSION} from '@angular/material';
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
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
  ]
})
export class OrdersAddComponent implements OnInit {
  version = VERSION
  order: Order[];
  customers: Customer[];
  factories: Factory[];
  brands= ['888', 'JP', 'AVE', 'OTHER'];
  //types = ["Delivary Duty Paid", "Freight On Board"];
  types = ['DDP', 'FOB', 'NA'];
  orderForm = this.fb.group({
    buyer: [''],
    factory: [''],
    customer_order_number: [''],
    buyer_style_number: [''],
    jp_style_number: [''],
    factory_ship_date: [''],
    cost_from_factory: [''],
    buyers_price: [''],
    qty: [''],
    order_type: [''],
    brand: [''],
    fiber_content: [''],
    jp_care_instructions: [''],
    color: [''],
  });
  //turn semicolon to commma to add nested json
  //tasks: this.fb.array([
  //  this.fb.control('')
  //])
  //});
  testdate: string;
  constructor(
    private fb: FormBuilder,
    private  apiService: ApiService,
  ) {
    this.orderForm = this.fb.group({
      'buyer': new FormControl(''),
      'factory': new FormControl(''),
      'customer_order_number': new FormControl(''),
      'buyer_style_number': new FormControl(''),
      'jp_style_number': new FormControl(''),
      'factory_ship_date': new FormControl(moment()),
      'cost_from_factory': new FormControl(''),
      'buyers_price': new FormControl(''),
      'qty': new FormControl(''),
      'order_type': new FormControl(''),
      'brand': new FormControl(''),
      'fiber_content': new FormControl(''),
      'jp_care_instructions': new FormControl(''),
      'color': new FormControl(''),
    });
  }

  ngOnInit() {
    this.getFactoryCustomer();
    }

  createCustomer() {
    const order = this.orderForm.value;
    this.apiService.createOrder(order).subscribe((response) => {
      console.log(response);
      this.orderForm.reset();
    });
  }
  getFactoryCustomer(){
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {

      this.customers = customers
      console.log(this.customers);
    });
    this.apiService.factories().subscribe((factories: Array<Factory>) => {

      this.factories = factories
      console.log(this.factories);
    });
  }
  createOrder() {
    this.orderForm.controls['factory_ship_date'].setValue(this.orderForm.controls['factory_ship_date'].value.format('YYYY-MM-DD'));
    const order = this.orderForm.value;
    console.log(order)
    this.apiService.createOrder(order).subscribe((response) => {
      console.log(response);
      this.orderForm.reset();
    });
  }
}

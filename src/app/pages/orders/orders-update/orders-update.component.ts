import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../config/api.service';
import {Order} from '../../../modules/models/orders.model';
import {Customer} from '../../../modules/models/Customer.model';
import {Factory} from '../../../modules/models/Factory.model';
import {OrdersSharedService} from '../orders-shared.service';
import {VERSION} from '@angular/material';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormBuilder, FormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
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
  selector: 'app-orders-update',
  templateUrl: './orders-update.component.html',
  styleUrls: ['./orders-update.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
  ]
})
export class OrdersUpdateComponent implements OnInit {

  //pull from backend to fill form
  customers: Customer[];
  factory: Factory[];

  subscription: Subscription;
  order: Order[];
  selectedOrder: Order[];
  version = VERSION
  customer: Customer[];
  brands= ['888', 'JP', 'AVE', 'OTHER'];
  //types = ["Delivary Duty Paid", "Freight On Board"];
  types = ['DDP', 'FOB', 'NA'];
  selectedFile: File;
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
    //sweater_image: [this.selectedFile],
  });

  constructor(
              private sharedService: OrdersSharedService,
              private apiService: ApiService,
              private fb: FormBuilder,
            ) {
              this.orderForm = this.fb.group({
                'id': new FormControl(''),
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
                //'sweater_image':new FormControl(),
              });

             }

  ngOnInit() {
    this.getFactoryCustomer();
  }

  sendMessage(message): void {
    this.sharedService.sendMessage(message);
    }
  clearMessage(): void {
    this.sharedService.clearMessage();
  }


  updateMyOrder() {
    let order = this.orderForm.value;
    let id = this.orderForm.get('id').value;
    console.log(order, id)
    this.apiService.updateOrder(id, order);

    this.orderForm.reset();
  }
  getFactoryCustomer(){
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers
      //console.log(this.customers);
    });
    this.apiService.factories().subscribe((factories: Array<Factory>) => {
      this.factory = factories
      //console.log(this.factory);
    });
    this.subscription = this.sharedService.getMessage().subscribe(message => {
      console.log(message);
      let myOrder = message;
      this.selectedOrder = message;
      this.orderForm.get('id').setValue(myOrder['id']);
      this.orderForm.get('buyer').setValue(myOrder['buyer']);
      this.orderForm.get('factory').setValue(myOrder['factory']);
      this.orderForm.get('customer_order_number').setValue(myOrder['customer_order_number']);
      this.orderForm.get('buyer_style_number').setValue(myOrder['buyer_style_number']);
      this.orderForm.get('jp_style_number').setValue(myOrder['jp_style_number']);
      this.orderForm.get('factory_ship_date').setValue(myOrder['factory_ship_date']);
      this.orderForm.get('cost_from_factory').setValue(myOrder['cost_from_factory']);
      this.orderForm.get('buyers_price').setValue(myOrder['buyers_price']);
      this.orderForm.get('qty').setValue(myOrder['qty']);
      this.orderForm.get('order_type').setValue(myOrder['order_type']);
      this.orderForm.get('brand').setValue(myOrder['brand']);
      this.orderForm.get('fiber_content').setValue(myOrder['fiber_content']);
      this.orderForm.get('jp_care_instructions').setValue(myOrder['jp_care_instructions']);
      this.orderForm.get('color').setValue(myOrder['color']);
    });
  }

  /*
  orderMessage(){
    this.subscription = this.sharedService.getMessage().subscribe(message => {
      console.log(message);
      return this.order = message;
      });
    }*/

}

import { Component, OnInit } from '@angular/core';
import {Order} from '../../../modules/models/orders.model';
import {FormBuilder, FormControl} from '@angular/forms';
import {ApiService} from '../../../config/api.service';
import {Customer} from '../../../modules/models/customer.model';
import {Factory} from '../../../modules/models/factory.model';
import { Observable }    from 'rxjs';


@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss']
})
export class OrdersAddComponent implements OnInit {
  order: Order[];
  customers: Customer[];
  factories: Factory[];
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
  }); //turn semicolon to commma to add nested json
  //tasks: this.fb.array([
  //  this.fb.control('')
  //])
  //});
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
      'factory_ship_date': new FormControl(''),
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
    const order = this.orderForm.value;
    this.apiService.createOrder(order).subscribe((response) => {
      console.log(response);
      this.orderForm.reset();
    });
  }
}

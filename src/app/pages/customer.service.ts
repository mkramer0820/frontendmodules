import { Injectable } from '@angular/core';
import {CustomerTableComponent} from './customer/customer-table/customer-table.component';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CustomerService {
  customer: any;

  constructor() {}
  setCustomer(object: any) {
    this.customer = object;
    return this.customer;
  }
  getCustomer() {
    return this.customer;
  }
}

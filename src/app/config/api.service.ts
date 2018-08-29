import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, of, throwError as observableThrowError } from 'rxjs';
import {map} from 'rxjs/operators';
import {catchError, tap} from 'rxjs/operators';
import {Customer} from '../modules/models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.API_URL}/customer/`);
  }
  createCustomer(customer) {
    return this.httpClient.post(`${this.API_URL}/customer/`, customer);
  }
  getCustomerDetail(id): Observable<Customer[]> {
    return this.httpClient.get<any>(`${this.API_URL}/customer/${id}/`);
  }
  updateCustomer(customer, id){
   return this.httpClient.put(`${this.API_URL}/customer/${id}/`, customer);
  }

  //factories
  factories() {
    return this.httpClient.get(`${this.API_URL}/factory/`);
  }


  //orders
  getOrders() {
    return this.httpClient.get(`${this.API_URL}/orders/`);
  }

  //tasks
  getTasks() {
    return this.httpClient.get(`${this.API_URL}/task/`);
  }
}

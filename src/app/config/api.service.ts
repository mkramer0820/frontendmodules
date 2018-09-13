import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Headers} from '@angular/http';

import {Observable, /*of, throwError as observableThrowError*/ } from 'rxjs';
//import {map} from 'rxjs/operators';
//import {catchError, tap} from 'rxjs/operators';
import {Customer} from '../modules/models/customer.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type':  'application/json',
    'Authorization' : 'Bearer' + localStorage.getItem('currentUser')
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  API_URL = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) {}
  token = localStorage.getItem('currentUser')
  headers = new HttpHeaders().set("token", this.token)


  getCustomers(): Observable<Customer[]> {
    console.log(this.headers)
    let headers = httpOptions
    return this.httpClient.get<Customer[]>(`${this.API_URL}/customer/`, httpOptions)
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
  getFactoryDetails(id): Observable<any[]> {
    return this.httpClient.get<any>(`${this.API_URL}/factory/${id}/`)
  }
  createFactory(factory) {
    return this.httpClient.post(`${this.API_URL}/factory/`, factory);
  }
  updateFactory(factory, id){
   return this.httpClient.put(`${this.API_URL}/factory/${id}/`, factory);
  }


  //orders
  getOrders() {
    return this.httpClient.get(`${this.API_URL}/orders/`);
  }
  getOrdersDetails(id) {
    return this.httpClient.get(`${this.API_URL}/orders/${id}`);
  }
  createOrder(order) {
    return this.httpClient.post(`${this.API_URL}/orders/`, order)
  }
  uploadSweaterImg(uploadData, id) {
    return this.httpClient.put(`${this.API_URL}/orders/${id}`, uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
        console.log(event);
         // handle event here
       });
    }

  getOrderDetials(id) {
    return this.httpClient.get<any>(`${this.API_URL}/orders/${id}/`);
  }
  updateOrder(id, order) {
    return this.httpClient.put(`${this.API_URL}/orders/${id}`, order, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
        console.log(event);
         // handle event here
       });
  }

  //tasks
  getTasks() {
    return this.httpClient.get(`${this.API_URL}/task/`);
  }
}

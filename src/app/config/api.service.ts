import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, of, throwError as observableThrowError } from 'rxjs';
import {map} from 'rxjs/operators';
import {Customer} from '../modules/models/customer.model';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.API_URL}/customer/`)
  }

  createCustomer(customer){
    return this.httpClient.post(`${this.API_URL}/customer/`, customer);
  }

  getFactories(){
    return this.httpClient.get(`${this.API_URL}/factory/`)
  }

  getOrders(){
    return this.httpClient.get(`${this.API_URL}/orders/`)
  }
  getTasks(){
    return this.httpClient.get(`${this.API_URL}/task/`)
  }
}
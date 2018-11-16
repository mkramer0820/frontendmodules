import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Headers} from '@angular/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {AppConfig} from './app.config';

import {Order} from '../modules/models/orders.model';
import {Observable, /*of, throwError as observableThrowError*/ } from 'rxjs';
//import {map} from 'rxjs/operators';
//import {catchError, tap} from 'rxjs/operators';
import {Customer} from '../modules/models/customer.model';
import {AuthenticationService} from '../pages/_services/authentication.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization' : 'JWT' + localStorage.getItem('currentUser')
  })
};



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cred: any;
  API_URL = AppConfig.base;
  //API_URL = 'http://104.248.10.237'
  private token = localStorage.getItem('currentUser');
  private headers: any;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.cred = this.authService.updateData(this.token); }

  setHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('content-type', 'application/json');
    let token = JSON.parse(this.token);
    headers = headers.set('Authorization', `Bearer ${token}`);
    //console.log(userDetails);
    console.log(headers);
    return headers;
  }
  getCustomers(): Observable<Customer[]> {

    return this.httpClient.get<Customer[]>(`${this.API_URL}customer/`, )
    }

  createCustomer(customer) {
    return this.httpClient.post(`${this.API_URL}customer/`, customer);
  }
  getCustomerDetail(id): Observable<Customer[]> {
    return this.httpClient.get<any>(`${this.API_URL}customer/${id}/`);
  }
  updateCustomer(customer, id){
   return this.httpClient.put(`${this.API_URL}customer/${id}/`, customer);
  }

  //factories
  factories() {
    return this.httpClient.get(`${this.API_URL}factory/`);
  }
  getFactoryDetails(id): Observable<any[]> {
    return this.httpClient.get<any>(`${this.API_URL}factory/${id}/`)
  }
  createFactory(factory) {
    return this.httpClient.post(`${this.API_URL}factory/`, factory);
  }
  //factory contacts
  updateFactory(factory, id){
   return this.httpClient.put(`${this.API_URL}factory/${id}/`, factory);
  }
  getFactoryContacts() {
    return this.httpClient.get(`${this.API_URL}factory/contacts/`);
  }
  updateFactoryContacts(id, contact) {
    return this.httpClient.put(`${this.API_URL}factory/contacts/${id}`, contact);
  }
  createFactoryContact(contact) {
    return this.httpClient.post(`${this.API_URL}factory/contacts/`, contact);
  }
  decodeJwt(){
    this.cred = this.authService.updateData(this.token);
  }
  //orders
  getOrders() {
    let headers = this.setHeaders();
    this.setHeaders();
    return this.httpClient.get(`${this.API_URL}orders/`, {headers});
  }

/*
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
          }
      });
  }*/

  getOrdersDetails(id) {
    return this.httpClient.get(`${this.API_URL}orders/${id}`);
  }
  createOrder(order) {
    return this.httpClient.post(`${this.API_URL}orders/`, order)
  }
  uploadSweaterImg(id, uploadData) {
    return this.httpClient.post(`${this.API_URL}orders/imgupload/${id}/`, uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
        console.log(event);
         // handle event here
    });
  }

  getOrderDetials(id) {
    return this.httpClient.get<any>(`${this.API_URL}orders/${id}/`);
  }
  updateOrder(id, order) {
    return this.httpClient.put(`${this.API_URL}orders/${id}/`, order);
  }

  //tasks
  getTasks() {
    return this.httpClient.get(`${this.API_URL}task/`);
  }
  getTaskDetail(id) {
    return this.httpClient.get(`${this.API_URL}task/${id}`, id);
  }
  updateTask(id, task) {
    return this.httpClient.put(`${this.API_URL}task/${id}/`, task);
  }
  createTask(task) {
    return this.httpClient.post(`${this.API_URL}task/`, task)
  }
  taskOptions() {
    return this.httpClient.options(`${this.API_URL}task/`).subscribe(response => {
      console.log(response)
    })
  }
  getTaskGroups() {
    return this.httpClient.get(`${this.API_URL}task/group/`);
  }
  addTaskGroups(group) {
    return this.httpClient.post(`${this.API_URL}task/group/`, group);
  }
  addTaskToOrder(task) {
    return this.httpClient.post(`${this.API_URL}orders/tasks/`, task);
  }
  updateOrderTask(task, id) {
    return this.httpClient.put(`${this.API_URL}orders/tasks/${id}`, task);
  }

  getDashBoardTask() {
    this.httpClient.get(`${this.API_URL}dashboard/}`);
  }
}

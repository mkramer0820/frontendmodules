import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {catchError, tap} from 'rxjs/operators';
import {Order} from '../../modules/models/orders.model';



@Injectable()
export class SharedService {

  public subject = new Subject<any>();
  public order: Order[];

  API_URL = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) {}

  sendMessage(order) {
      this.subject.next( order );
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
      //return this.customer.asObservable();
  }

///order api
  getOrderDetails(id) {
    this.httpClient.get<any>(`${this.API_URL}/orders/${id}`).subscribe(resp => {
    //this.order = order;
    return this.sendMessage(resp)
    })
  }
}

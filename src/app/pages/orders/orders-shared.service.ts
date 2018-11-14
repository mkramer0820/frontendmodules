import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {catchError, tap} from 'rxjs/operators';
import {Order} from '../../modules/models/orders.model';



@Injectable({ providedIn: 'root' })
export class OrdersSharedService {

  public subject = new Subject<any>();
  public factory = new Subject<any>();
  public buyer = new Subject<any>();


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



}

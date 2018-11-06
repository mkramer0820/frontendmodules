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


  API_URL = 'http://127.0.0.1:8000';
  //API_URL = 'http://104.248.10.237/'
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

/*
getFactory(): Observable<any> {
  return this.factory.asObservable()
}
getBuyer(): Observable<any> {
  return this.buyer.asObservable()
}

  sendFactoryMessage(factory) {
      this.factory.next( factory );
  }
  sendBuyerMessage(buyer) {
      this.buyer.next( buyer );
  }
  getOrderDetails(id) {
    this.httpClient.get<any>(`${this.API_URL}/orders/${id}`).subscribe(resp => {
    //this.order = order;
    return this.sendMessage(resp)
    });
    /*
    this.httpClient.get<any>(`${this.API_URL}/factory/`).subscribe(resp => {
      return this.sendFactoryMessage(resp)
    });
    this.httpClient.get<any>(`${this.API_URL}/customer/`).subscribe(resp => {
      return this.sendBuyerMessage(resp)
    });
  }
*/

}

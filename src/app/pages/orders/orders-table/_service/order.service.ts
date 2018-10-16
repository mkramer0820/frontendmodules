import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Orders} from '../../../../modules/models/orders.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public paginatorLength: string;

  constructor(private http: HttpClient) {}

  findOrders(buyer: string, dueDateBefore: string, dueDateAfter: string, ordering: string ){

      return this.http.get('http://127.0.0.1:8000/orders/?', {
          params: new HttpParams()
              .set('buyer', buyer.toString())
              .set('due_date_after', dueDateBefore.toString())
              .set('due_date_before', dueDateAfter.toString())
              .set('ordering', ordering.toString())
      });
  }
}

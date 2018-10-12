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

  findOrders(ordering: string, page: number, page_size: number ):  Observable<Orders[]> {

      return this.http.get('http://127.0.0.1:8000/orders/filters/?', {
          params: new HttpParams()
              .set('ordering', ordering.toString())
              .set('page', page.toString())
              .set('page_size', page_size.toString())
      }).pipe(
          map(res =>  res['results'])
      );
  }
}

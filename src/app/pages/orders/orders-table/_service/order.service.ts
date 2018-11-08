import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Order} from '../../../../modules/models/orders.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {AppConfig} from '../../../../config/app.config';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders = new BehaviorSubject<Order[]>([]);
  currentOrders = this.orders.asObservable();
  sort: any = '';
  parameters: {}

  changeOrder(orders: Order[]) {
      this.orders.next(orders)
    }


  public paginatorLength: string;

  constructor(private http: HttpClient) {}
  setParameters(params?:  {
    buyer?: string;
    dueDateBefore?: string;
    dueDateAfter?: string;
    ordering?: string;
    buyerStyle?: string;
    jpStyle?:string; })
     {
      this.parameters = params;
    }
  findOrders(
    buyer?: string, dueDateBefore?: string, dueDateAfter?:  string , ordering?: string, buyerStyle?: string , jpStyle?:string){
      //let params = this.currentParams.subscribe(message => params = message)
      console.log('params are', this.parameters)
      console.log(this.sort);
      

      return this.http.get( `${AppConfig.endpoints.url + AppConfig.urlOptions.orders +'?'}`, {
          params: new HttpParams()
              .set('buyer', buyer.toString())
              .set('due_date_after', dueDateBefore.toString())
              .set('due_date_before', dueDateAfter.toString())
              .set('ordering', ordering.toString())
              .set('buyer_style_number', buyerStyle.toString())
              .set('jp_style_number', jpStyle.toString())
      });/*
      , {
          params: new HttpParams()
              .set('buyer', this.parameters['buyer'].toString())
              .set('due_date_after', this.parameters['dueDateAfter'].toString())
              .set('due_date_before', this.parameters['dueDateBefore'].toString())
              .set('ordering', this.parameters['ordering'].toString())
              .set('buyer_style_number', this.parameters['buyerStyle'].toString())
              .set('jp_style_number', this.parameters['jpStyle'].toString())
      });
      .pipe(
        catchError(() => of([])),
      )
      .subscribe((orders: Order[]) => {
        this.changeOrder(orders)
        //this.getTotalCost(orders);
        //this.sentFilters(this.orders);
      });*/
  }
  findOrders2() {
    return this.http.get( `${AppConfig.endpoints.url + AppConfig.urlOptions.orders +'?'}`, 
        {
          params: new HttpParams()
              .set('buyer', this.parameters['buyer'].toString())
              .set('due_date_after', this.parameters['dueDateAfter'].toString())
              .set('due_date_before', this.parameters['dueDateBefore'].toString())
              .set('ordering', this.parameters['ordering'].toString())
              .set('buyer_style_number', this.parameters['buyerStyle'].toString())
              .set('jp_style_number', this.parameters['jpStyle'].toString())
        })
        .pipe(
          catchError(() => of([])),
        )
        .subscribe((orders: Order[]) => {
          this.changeOrder(orders)
          //this.getTotalCost(orders);
          //this.sentFilters(this.orders);
        });
      }
  
}



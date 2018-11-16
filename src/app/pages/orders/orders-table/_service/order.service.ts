import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
//import {Order} from '../../../../modules/models/orders.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {AppConfig} from '../../../../config/app.config';
import {UrlParameters} from './url-parameters.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders = new BehaviorSubject<Order[]>([]);
  currentOrders = this.orders.asObservable();
  sort: string;
  url = new UrlParameters();
  parameters: {
    buyer?: string;
    dueDateBefore?: string;
    dueDateAfter?: string;
    ordering?: string;
    buyerStyle?: string;
    jpStyle?:string;
    isActive?: boolean;
    page?: number;
    pageSize?: number;
    currentPage?: number;
    length?: number;}
  

  


  public paginatorLength: string;

  constructor(
    private http: HttpClient) { this.url = new UrlParameters; console.log(this.url)}

  changeOrder(orders: Order[]) {
    this.orders.next(orders)
  }
  setParameters(params?:  {
    buyer?: string;
    dueDateBefore?: string ;
    dueDateAfter?: string;
    ordering?: string;
    buyerStyle?: string;
    jpStyle?:string;
    isActive?: boolean;
    page?: number;
    pageSize?: number;
    currentPage?: number;
    length?: number;
   })
     {
      this.parameters = params;
      console.log(this.parameters)
      console.log(this.url)
      
    }
  



 
  //http://127.0.0.1:8000/api/orders/paginator/?ordering=buyer=&buyer_style_number=&due_date_after=&due_date_before=&isActive=&jp_style_number=&page=&page_size=
  findPaginatedOrders() {
    return this.http.get( `${AppConfig.base + AppConfig.urlOptions.orders + 'paginator/' +'?'}`,
        {
          params: new HttpParams()
              .set('ordering', this.url.ordering.toString())
              .set('buyer', this.url.buyer.toString())
              .set('due_date_before', this.url.dueDateBefore.toString())
              .set('due_date_after', this.url.dueDateAfter.toString())
              .set('buyer_style_number', this.url.buyerStyle.toString())
              .set('jp_style_number', this.url.jpStyle.toString())
              .set('isActive', this.url.isActive.toString())
              .set('page', this.url.djangoPageNumber.toString())
              .set('page_size', this.url.pageSize.toString())

        })
        .pipe(
          catchError(() => of([])),
        ).subscribe((paginator: Paginator) => {
          this.url.page = paginator.angular_current_page;
          this.url.djangoPageNumber = paginator.page;
          this.url.length = paginator.count;
          let orders = paginator.results;
          this.changeOrder(orders)     
    
     });
  }
  
  findOrders2() {
    console.log(this.parameters)
    return this.http.get( `${AppConfig.base + AppConfig.urlOptions.orders +'?'}`,
        {
          params: new HttpParams()
              .set('ordering', this.parameters['ordering'].toString())
              .set('buyer', this.parameters.buyer.toString())
              .set('due_date_before', this.parameters['dueDateBefore'].toString())
              .set('due_date_after', this.parameters['dueDateAfter'].toString())
              .set('ordering', this.parameters['ordering'].toString())
              .set('buyer_style_number', this.parameters['buyerStyle'].toString())
              .set('jp_style_number', this.parameters['jpStyle'].toString())
              .set('isActive', this.parameters['isActive'].toString())
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
/*
  findOrders(
    buyer?: string, dueDateBefore?: string, dueDateAfter?:  string , ordering?: string, buyerStyle?: string , jpStyle?:string, isActive?:boolean){
      //let params = this.currentParams.subscribe(message => params = message)
      console.log('params are', this.parameters)
      console.log(this.sort);
      let sort = this.sort;
      let sortdir: string;
      if (this.sort === '') {
        sortdir = ''
        return this.sort = '-'
      }

      return this.http.get( `${AppConfig.endpoints.url + AppConfig.urlOptions.orders +'?'}`, {
          params: new HttpParams()
              .set('ordering', ordering.toString())
              .set('buyer', buyer.toString())
              .set('due_date_after', dueDateBefore.toString())
              .set('due_date_before', dueDateAfter.toString())
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
      });
  }*/
  
  
}


export interface Paginator {
  next: string;
  previous?: any;
  count: number;
  total_pages: number;
  angular_current_page: number;
  page: number;
  results: Order[];
}

export interface Order {
  id: number;
  buyer?: string;
  factory?: string;
  buyer_name?: string;
  factory_name?: string;
  tasks: Task[];
  due_date: string;
  factory_ship_date: string;
  sweater_image?: string;
  factory_set: Factoryset[] | string;
  customer_set: Customerset[] | string;
  orderExpense: OrderExpense[];
  isActive: boolean;
  customer_order_number: string;
  buyer_style_number: string;
  jp_style_number: string;
  cost_from_factory?: number;
  buyers_price?: number;
  order_type?: string;
  qty?: number;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
}

export interface OrderExpense {
  order: number;
  totalExpense: number;
  expenseItems: ExpenseItem[];
}

export interface ExpenseItem {
  expenseItemCost: number;
  expenseItemName: string;
  expenseItemTotal: number;
}

export interface Customerset {
  id: number;
  isActive: boolean;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  phone: string;
  extension: string;
  website: string;
  description: string;
  createdOn: string;
}

export interface Factoryset {
  id: number;
  isActive: boolean;
  name: string;
  contact_name_id: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode?: any;
  country: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  createdOn: string;
}

export interface Task {
  id: number;
  isActive: boolean;
  set_name: string;
  todos_group: string;
  set_status: string;
  todos: Todo[];
  order: number;
}

export interface Todo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}
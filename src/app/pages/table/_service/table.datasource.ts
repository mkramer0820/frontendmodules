import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {Iorder} from "../_models/Iorder";
import {TableService} from "./table-service.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize, first} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import { tick } from "@angular/core/testing";



export class TableDataSource implements DataSource<Result> {
    

    private orderSubject = new BehaviorSubject<Result[]>([]);
    private columns = new BehaviorSubject<Array<string>>([]);


    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    orders$ = this.orderSubject.asObservable();
    private _data = new BehaviorSubject<any[]>([{order: Array, cols: Array}])
    orderData = this._data.asObservable();

    constructor(private tableService: TableService) {

    }

    recievedOrders(orders: Result[]) {
      let results = [];
      orders.map(orders => {
        let data = {order: Object.values(orders), cols: Object.keys(orders)}
        results.push(data)
        
      })
      this._data.next(results);
      console.log(this.orderData)
    }



    loadOrders(opt: {} = {}) {

        this.loadingSubject.next(true);

        this.tableService.findOrder(opt).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(orders => {
                let cols = [];
                Object.keys(orders[0]).forEach(key => {
                    cols.push(key)
                    });
                Object.values(orders).forEach(value => {
                  this.orderSubject.next(value)
                  });
                this.recievedOrders(orders);
                console.log(this.orderData)
                //this.columns.next(cols);
                //this.orderSubject.next(orders)
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Result[]> {
        console.log("Connecting data source");
        return this.orderSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.orderSubject.complete();
        this.loadingSubject.complete();
    }

}

export interface PaginatorOrder {
  next: string;
  previous?: any;
  count: number;
  total_pages: number;
  angular_current_page: number;
  page: number;
  results: Result[];
}

interface Result {
  id: number;
  buyer: number;
  factory?: number;
  buyer_name: string;
  factory_name?: string;
  tasks: Task[];
  due_date?: string;
  factory_ship_date?: string;
  sweater_image?: string;
  size?: any;
  sizing: any[];
  factory_set: Factoryset[] | string;
  customer_set: Customerset[];
  orderExpense: OrderExpense[];
  completeTasks: any[];
  incompleteTasks: Task[];
  isActive: boolean;
  customer_order_number: number;
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
  jp_style_number_test: any[];
}

interface OrderExpense {
  id: number;
  totalExpense: number;
  expenseItems: ExpenseItem[];
  order?: any;
}

interface ExpenseItem {
  expenseItemCost: number;
  expenseItemName: string;
  expenseItemTotal: number;
}

interface Customerset {
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

interface Factoryset {
  id: number;
  isActive: boolean;
  name: string;
  contact_name_id: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  createdOn: string;
}

interface Task {
  id: number;
  buyer_style_number: string;
  jp_style_number: string;
  order_due_date: string;
  buyer: string;
  isActive: boolean;
  set_name: string;
  todos_group: string;
  set_status: string;
  todos: Todo[];
  order: number;
}

interface Todo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Order} from "../_models/orders.model";
import {map} from "rxjs/operators";
import {Iorder} from "../_models/Iorder";
import {AppConfig} from "app/config/app.config";
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Injectable({
  providedIn: 'root'
})
export class TableService {

    private _sortDir = {'asc': '', 'dsc': '-'}

    private readonly base = AppConfig.base + AppConfig.urlOptions.orders + 'paginator/' +'?'
    constructor(private http:HttpClient) {

    }

    findOrder(obj: {} = {}):  Observable<Result[]> {
      let params = new HttpParams();
      Object.keys(obj).forEach(key => {

        if (obj[key] instanceof(Date || _moment))  {
          let value = moment(obj[key]).format("YYYY-MM-DD")
          params.set(key, value.toString())
        }
        if (obj[key] instanceof(Number))  {
          params.set(key, obj[key].toString())
        }
        if (obj[key] instanceof(String))  {
          params.set(key, obj[key].toString())
        }
      });
      return this.http.get(this.base, {params}).pipe(
            map((res: PaginatorOrder) =>  res.results)
        );
    }
}
     



export class Paginator {
  data: {} = {}

  constructor(data:{} ={}){
    this.data = data;
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

export interface Result {
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
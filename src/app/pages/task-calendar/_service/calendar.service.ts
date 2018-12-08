import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import {AppConfig} from 'app/config/app.config';
import {HttpClientService} from 'app/_services/http-client.service';
import {map} from 'rxjs/operators';
import {pipe, Observable} from 'rxjs';
import { colors } from '../calendar-utils/colors';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendarEvents: Observable<CalendarEvent[]>;

  private _calendarEvent: BehaviorSubject<CalendarEvent[]>; 
  private calEventDataStore: {  // This is where we will store our data in memory
    calEvents: CalendarEvent[]
  };
  private baseUrl: string;



  constructor(private http: HttpClientService) {
    this.baseUrl  = AppConfig.urlOptions.orders,
    this.calEventDataStore = { calEvents: [] };
    this._calendarEvent = <BehaviorSubject<CalendarEvent[]>>new BehaviorSubject([]);
    this.loadAll();
    this.calendarEvents = this._calendarEvent.asObservable();

  }
  get calEvents() {
    return this._calendarEvent.asObservable();
  }

  loadAll() {

    let todoItems: CalendarEvent[] = [];
    this.http.get(`${AppConfig.base + AppConfig.urlOptions.orders}`)
      .subscribe((res: Order[]) => {
        res.map((order , index) => {
          const items = {
            title: 'Order For Buyer Style Number '+ order.buyer_name +' ' + order.buyer_style_number + ' Is Due',
            color: {primary: colors.blue, secondary: "#D1E8FF"},
            start: new Date(order.due_date)
          }
          this.calEventDataStore.calEvents.push(items)
          this._calendarEvent.next(Object.assign({}, this.calEventDataStore).calEvents);
        });
        let todo = res.map((orderTodo, index)=> {
          let order = orderTodo.buyer_style_number;
          let jp = orderTodo.jp_style_number;
          let buyer = orderTodo.buyer_name;
          let orderTaskItem = orderTodo.tasks;
          orderTaskItem.forEach((todo, index)=> {
            todo.todos.forEach((todo,index) => {
              let items = {
                title: todo.todo,
                color: colors.red,
                start: new Date(todo.duedate)
              };
              this.calEventDataStore.calEvents.push(items);
              this._calendarEvent.next(Object.assign({}, this.calEventDataStore).calEvents);
            });
          });
        });
      console.log(this.calendarEvents)
      });
    }
  }


interface Order {
  id: number;
  buyer: number;
  factory: number;
  buyer_name: string;
  factory_name: string;
  tasks: Task[];
  due_date: string;
  factory_ship_date: string;
  sweater_image: string;
  size?: any;
  sizing: any[];
  factory_set: Factoryset[];
  customer_set: Customerset[];
  orderExpense: any[];
  completeTasks: Task[];
  incompleteTasks: Task[];
  isActive: boolean;
  customer_order_number: number;
  buyer_style_number: string;
  jp_style_number: string;
  cost_from_factory: number;
  buyers_price: number;
  order_type: string;
  qty: number;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
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
  set_status?: any;
  todos: Todo[];
  order: number;
}

interface Todo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}
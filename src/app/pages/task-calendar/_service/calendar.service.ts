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
  private _calendarEvents =  new BehaviorSubject<CalendarEvent[]>([]);
  calEvents$ = this._calendarEvents;




  constructor(private http: HttpClientService) {
    this.loadEvents().subscribe(res => {
      this._calendarEvents.next(res);
    })
  }




  getMessage(): Observable<CalendarEvent[]> {
      return this.calEvents$.asObservable();
      //return this.customer.asObservable();
  }

  loadEvents() {
    return this.http.get(AppConfig.urlOptions.orders)
    .pipe(
      map((res: Order[]) => {
        const calitems:CalendarEvent[] = []

        let orderItem = res.map(event => {
          let item = {
            title: event.buyer_name +' Style Number ' + event.buyer_style_number + ' Is Due',
            color:  colors.blue,
            start: new Date(event.due_date),
            meta: {
              event
            },
            allDay: false,
            tasks: event.tasks,
          };
          calitems.push(item);
        })
      res.map(event => {
        for (let orderTask of event.tasks) {
          let setName = orderTask.set_name;
          let style = orderTask.buyer_style_number;
          let buyer = orderTask.buyer;
          for (let task of orderTask.todos) {
            let taskItem = {
              title: task.todo  +' For ' + buyer + ' Style Number ' + style + ' Is Due' + "\n status: " + task.status,
              color: colors.yellow,
              start: new Date(task.duedate),
          }
          calitems.push(taskItem);
        }
      }})
      return calitems;
     }));
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
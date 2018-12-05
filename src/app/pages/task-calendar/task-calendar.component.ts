import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {HttpClientService} from '../../_services/http-client.service';
import {AppConfig} from '../../config/app.config';
import { map, flatMap, filter, delay } from 'rxjs/operators';
import {pipe, Subject} from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import {}
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from './calendar-utils/colors';
import { analyzeFileForInjectables } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

interface TaskEvents {
  taskEvent: TaskEvent[];
}

interface TaskEvent {
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
interface Film {
  id: number;
  title: string;
  release_date: string;
}

interface TaskCal {
  title: string;
  color: any;
  start: Date;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

@Component({
  selector: 'app-task-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./task-calendar.component.scss'],
  templateUrl: './task-calendar.component.html'
})
export class TaskCalendarComponent implements OnInit, OnChanges {
  view: string = 'month';

  viewDate: Date = new Date();

  // events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  events$: Observable<Array<CalendarEvent<{ task: TaskEvent }>>>;
  activeDayIsOpen: boolean = false;

  asyncEvents$: Observable<CalendarEvent[]>;
  todoEvents$: Todo[] = [];
  async2$: CalendarEvent[];
  isLoading: boolean;
  


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchEvents();
    this.loadEvents();
    this.loadEvents2();
  }
  ngOnChanges() {
    this.isLoading = false;
  }


 loadEvents() {
    this.isLoading = true;
    this.asyncEvents$ = this.http.get(`${AppConfig.base + AppConfig.urlOptions.orders}`)

    .pipe(map((res: Order[]) => {
      return res.map(event => {
        return {
          title: 'Order For Buyer Style Number ' + event.buyer_name + ' ' + event.buyer_style_number + ' Is Due',
          color: {primary: colors.blue, secondary: '#D1E8FF'},
          start: new Date(event.due_date),
            meta: {
              event
            },
            allDay: false,
            tasks: event.tasks,
          };
        });
      }));
      this.isLoading = false;
  }
  loadEvents2() {

    let todoItems: CalendarEvent[] = [];
    this.http.get(`${AppConfig.base + AppConfig.urlOptions.orders}`)
      .subscribe((res: Order[]) => {
        res.map((order , index) => {
          const items = {
            title: 'Order For Buyer Style Number '+ order.buyer_name +' ' + order.buyer_style_number + ' Is Due',
            color: {primary: colors.blue, secondary: "#D1E8FF"},
            start: new Date(order.due_date)
          }
          todoItems.push(items)
        });
        let todo = res.map((orderTodo, index)=> {
          let order = orderTodo.buyer_style_number;
          let jp = orderTodo.jp_style_number;
          let buyer = orderTodo.buyer_name;
          let orderTaskItem = orderTodo.tasks;
          return orderTaskItem.forEach((todo, index)=> {
            todo.todos.forEach((todo,index) => {
              let items = {
                title: todo.todo,
                color: colors.red,
                start: new Date(todo.duedate)
              };
              todoItems.push(items);
            });
          });
        });
        this.isLoading = false;
        console.log(todoItems);
        return this.async2$ =  todoItems;
      });
    }

  dayClicked({ date, events }: {date: Date; events: Array<CalendarEvent<{ taskEvent: TaskEvent }>>; }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0

        ) {
          this.activeDayIsOpen = false;
          console.log(events);

        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }
  
    eventClicked(event: CalendarEvent<{ taskEvent: TaskEvent }>): void {
      console.log(event);
      console.log(event.meta)
      console.log(event.meta['event']['id'])
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
  completeTasks: any[];
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
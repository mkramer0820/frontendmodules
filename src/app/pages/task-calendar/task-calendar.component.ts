import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {HttpClientService} from '../../_services/http-client.service';
import {AppConfig} from '../../config/app.config';
import { map, flatMap, filter, delay } from 'rxjs/operators';
import {pipe, Subject} from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
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
    this.loadEvents2()
  }
  ngOnChanges() {
    this.isLoading = false;
  }


  loadEvents() {
    this.isLoading = true;
    this.asyncEvents$ = this.http.get(`${AppConfig.base + AppConfig.urlOptions.orderTasks}`)
    
    .pipe(map((res: TaskEvent[]) => {
      res.forEach((res, index) => {
        res.todos.forEach((todo, index) => {
          this.todoEvents$.push(todo);
          return this.todoEvents$.map(event => {
            let items = {
              title: event.todo,
              color: colors.yellow,
              start: new Date(event.duedate),
            }
            return items;
          })
        });
      });          
      return res.map(event => {
        return {
            title: event.buyer_style_number + " - " + event.set_name,
            start: new Date(event.order_due_date),
            color: {primary: colors.blue, secondary: "#D1E8FF"},
            meta: {
              event
            },
            allDay: false,
            todo: event.todos,
          }
        })
      }))
      this.isLoading = false;
  };
    loadEvents2() {
     // this.asyncEvents$ 
    let todoItems: CalendarEvent[] =[];
    this.http.get(`${AppConfig.base + AppConfig.urlOptions.orderTasks}`)
      
      .subscribe((res: TaskEvent[]) => {
        res.map((res, index)=> {
          let items = {
            title: res.buyer_style_number,
            color: {primary: colors.blue, secondary: "#D1E8FF"},
            start: new Date(res.order_due_date)
          }
          todoItems.push(items)
        })
        let todo = res.map((res, index)=> {
          return res.todos.forEach((todo, index)=> {
            let items = {
              title: todo.todo,
              color: colors.yellow,
              start: new Date(todo.duedate),
            }
            todoItems.push(items);
          })
        })
        return this.async2$ =  todoItems
      })
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



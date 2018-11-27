import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {HttpClientService} from '../../_services/http-client.service';
import {AppConfig} from '../../config/app.config';
import { map } from 'rxjs/operators';
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
export class TaskCalendarComponent implements OnInit {
  view: string = 'month';

  viewDate: Date = new Date();

  // events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  events$: Observable<Array<CalendarEvent<{ task: TaskEvent }>>>;
  activeDayIsOpen: boolean = false;

  asyncEvents$: Observable<CalendarEvent[]>;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchEvents();
    this.loadEvents();
  }


  loadEvents() {
    this.asyncEvents$ = this.http.get<TaskEvent[]>(`${AppConfig.base + AppConfig.urlOptions.orderTasks}`)
    .pipe(map(res => { 

        return res.map(event => { 
          return {
              title: event.buyer_style_number + " - " + event.set_name,
              start: new Date(event.order_due_date),
              color: {primary: colors.blue, secondary: "#D1E8FF"},
              meta: {
                event
              },
              allDay: true,
              todo: event.todos,
              
            };
        })
    }))

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
          console.log(this.asyncEvents$);

        }
        console.log(events);
      }
    }
  
    eventClicked(event: CalendarEvent<{ taskEvent: TaskEvent }>): void {
      console.log(event);
      console.log(event.meta)
      console.log(event.meta['event']['id'])
    }
  }



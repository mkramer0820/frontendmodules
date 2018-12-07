import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskCalendarComponent } from './task-calendar.component';
import { CalendarUtilsModule } from './calendar-utils/calendar-utils.module';
import {SharedModule} from '../../shared/shared.module';
import {TaskCalendarComponentBk} from './task-calendar.component.bk';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CalendarUtilsModule
  ],
  declarations: [TaskCalendarComponent, TaskCalendarComponentBk],
  exports: [TaskCalendarComponent]
})
export class TaskCalendarModule {}
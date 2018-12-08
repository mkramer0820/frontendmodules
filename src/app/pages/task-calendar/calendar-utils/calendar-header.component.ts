import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `

    <div class="row text-center">
      <div class="container"
        fxLayout
        fxLayout.xs="column"
        fxLayoutAlign="center"
        fxLayoutGap="10px"
        fxLayoutGap.xs="0">

          <div class="primary-dark" fxFlex="20%"> <!-- start of left-->
            <button mat-icon-button
            color="primary"
              mwlCalendarPreviousView
              [view]="view"
              [(viewDate)]="viewDate"
              (viewDateChange)="viewDateChange.next(viewDate)">
              <mat-icon>arrow_left</mat-icon>
            </button>
            <button mat-icon-button
              color="primary"
              mwlCalendarToday
              [(viewDate)]="viewDate"
              (viewDateChange)="viewDateChange.next(viewDate)">
              <mat-icon>calendar_today</mat-icon>
            </button>
            <button mat-icon-button
              color="primary"
              mwlCalendarNextView
              [view]="view"
              [(viewDate)]="viewDate"
              (viewDateChange)="viewDateChange.next(viewDate)">
              <mat-icon>arrow_right</mat-icon>
            </button>   
          </div> <!--end of left-->

          <div class="calViews" fxFlex="20%" fxFlexOrder="3"> <!-- start of right-->
          <mat-form-field>

          <mat-select placeholder="Select View">
            <mat-option (click)="viewChange.emit('month')" [class.active]="view === 'month'"> Month </mat-option>
            <mat-option (click)="viewChange.emit('week')" [class.active]="view === 'week'"> Week </mat-option>
            <mat-option (click)="viewChange.emit('day')" [class.active]="view === 'day'"> Day </mat-option>
          </mat-select>

          </mat-form-field>
            
          </div> <!-- end of right-->

          <div class="item item-3" fxFlex> <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3></div> <!-- center div-->
      </div>
    </div>
    <br>
  `,
  styleUrls: ['./calendar-header.component.scss'],
})
export class CalendarHeaderComponent {
  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale: string = 'en';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();
}

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  template:
  `
  <mat-form-field>
  <mat-datepicker-toggle matPrefix [for]="picker"></mat-datepicker-toggle>
  <input matInput [matDatepicker]="picker" [value]="dateValue" (dateInput)="addEvent('input', $event)" [placeholder]="placeholder">
  <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }]
})
export class DatePickerComponent implements ControlValueAccessor  {

  @Input() _dateValue: string = null;

  /**
   * Placeholder value for the material control input
   */
  @Input() public placeholder: string = null;

  /**
   * The date format to use with default format but allowing you to pass a custom date format
   */
  @Input() private format = 'YYYY/MM/DD HH:mm:ss';

  get dateValue() {
    return moment(this._dateValue, this.format);
  }

  set dateValue(val) {
    this._dateValue = moment(val).format(this.format);
    this.propagateChange(this._dateValue);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value, this.format);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.dateValue = moment(value, this.format);
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}


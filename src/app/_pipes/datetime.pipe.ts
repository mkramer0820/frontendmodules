import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../_util/constants';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datetime'
})
export class DatetimeFormat extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }

}


@Pipe({
  name: 'date'
})
export class DateFormat extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_FMT);
  }

}

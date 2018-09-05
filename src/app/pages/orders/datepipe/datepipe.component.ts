import { Constants } from './../util/constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DatepipeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

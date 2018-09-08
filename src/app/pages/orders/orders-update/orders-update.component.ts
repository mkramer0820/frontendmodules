import { Component, OnInit } from '@angular/core';
import {Order} from '../../../modules/models/orders.model';
import {SharedService} from '../shared.service';


import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
  selector: 'app-orders-update',
  templateUrl: './orders-update.component.html',
  styleUrls: ['./orders-update.component.scss'],
  providers: [SharedService]
})
export class OrdersUpdateComponent implements OnInit {


  constructor(
              private custService: SharedService,
            ) { }

  ngOnInit() {
    this.custService.getOrderDetails(1);
    this.custService.getMessage();
  }

}

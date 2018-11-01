import { Component, Input, OnInit, AfterContentChecked, AfterViewChecked, OnDestroy }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import {AppConfig} from          '../../../config/app.config';
import {HttpClientService} from   '../../../_services/http-client.service';
import { FormBase }              from '../../_models/form-base';
import { FormControlService }    from '../../_service/form-control.service';
import {ApiService} from '../../../config/api.service';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

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
  selector: 'app-factory-form',
  templateUrl: './factory-form.component.html',
  styleUrls: ['./factory-form.component.scss'],
  providers: [FormControlService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
  ]
})
export class FactoryFormComponent implements  AfterContentChecked {

  // @Input() models: FormBase<any>[] = [];
  @Input() models: any;
  @Input() form: FormGroup;
  @Input() submitUrl: string;
  @Input() update: boolean;
  // form: FormGroup;
  payLoad = '';
 
  constructor(private fcs: FormControlService, private submitService: HttpClientService ) {  }

  ngAfterContentChecked() {
    this.payLoad = this.form.value;

  }

  onSubmit() {
    if (this.update === false) {
      let formdata = new FormData()
      for (let field in this.form.value) {
        if (field === 'due_date' || field ==='factory_ship_date' ) {
          let date = this.form.get(field).value
          date = moment(date).format('YYYY-MM-DD hh:mm')
          // formdata.append(field, date)
        } else {
          formdata.append(field, this.form.get(field).value)
        }
      }
      this.submitService.post(this.submitUrl, formdata).subscribe(response => {
        response = this.form.value;
        console.log(response);
        this.form.reset();
      });
    } else {
      let formdata = new FormData()
      for (let field in this.form.value) {
        if (field === 'due_date' || field ==='factory_ship_date' ) {
          let date = this.form.get(field).value
          date = moment(date).format('YYYY-MM-DD hh:mm')
          // formdata.append(field, date)
        } else {
          formdata.append(field, this.form.get(field).value)
        }
      }
      this.submitService.put(this.submitUrl, formdata).subscribe(response => {
        response = this.form.value;
        console.log(response);
        this.form.reset();
      });
    }
  }
  toFormGroup(models) {
    return this.form = this.fcs.toFormGroup(models)
  }
}

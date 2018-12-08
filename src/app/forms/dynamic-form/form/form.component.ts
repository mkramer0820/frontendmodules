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
  selector: 'app-form',
  templateUrl: './form.component.html',
  // styleUrls: ['./form.component.scss'],
  styleUrls: ['form.component.scss'],
  providers: [FormControlService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
  ]
})
export class FormComponent implements AfterContentChecked {

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
    let formdata = new FormData();
    for (let field in this.form.value) {
      if (field === 'due_date' || field ==='factory_ship_date' ) {
        let formatdate = this.form.get(field).value;
        formatdate = moment(formatdate).format('YYYY-MM-DD hh:mm');
        formdata.append(field, formatdate)
        } else {
          formdata.append(field, this.form.get(field).value)
        }
      }
      if (this.update === false) {
        this.submitService.post(this.submitUrl, formdata).subscribe(response => {
          response = this.form.value;
          console.log(response);
          this.form.reset();
          this.submitService.openSnackBar('Created');
        })
      } else {
        this.submitService.put(this.submitUrl, formdata).subscribe(response => {
          response = this.form.value;
          console.log(response);
          this.form.reset();
          this.submitService.openSnackBar('Updated');
      });
    } 
  }
  toFormGroup(models) {
    return this.form = this.fcs.toFormGroup(models)
  }
}

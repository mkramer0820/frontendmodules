import { Component, Input, OnInit, AfterContentChecked, AfterViewChecked, OnDestroy }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import {AppConfig} from          '../../../config/app.config';
import {HttpClientService} from   '../../../_services/http-client.service';
import { FormBase }              from '../../_models/form-base';
import { FormControlService }    from '../../_service/form-control.service';
import {ApiService} from '../../../config/api.service';

@Component({
  selector: 'app-factory-form',
  templateUrl: './factory-form.component.html',
  styleUrls: ['./factory-form.component.scss'],
  providers: [FormControlService],
})
export class FactoryFormComponent implements  AfterContentChecked {

  // @Input() models: FormBase<any>[] = [];
  @Input() models: any;
  @Input() form: FormGroup;
  // form: FormGroup;
  payLoad = '';
 
  constructor(private fcs: FormControlService, private submitService: HttpClientService ) {  }

  ngAfterContentChecked() {

  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    console.log(this.payLoad);
    this.submitService.post(AppConfig.endpoints.customer, this.form.value).subscribe(response => {
      response = this.form.value;
      console.log(response);
      this.form.reset();
    });
  }
  toFormGroup(models) {
    return this.form = this.fcs.toFormGroup(models)
  }
}

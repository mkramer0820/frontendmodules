import { Component, Input, OnInit, AfterContentChecked, AfterViewChecked, OnDestroy }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
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
 
  constructor(private fcs: FormControlService, private submitService: ApiService ) {  }

  ngAfterContentChecked() {

  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    console.log(this.payLoad)
    //this.submitService.createFactory(this.form.value).subscribe(response => {
    //  response = this.form.value;
    //  console.log(response);
   // });
  }
  toFormGroup(models) {
    return this.form = this.fcs.toFormGroup(models)
  }
}

import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { FormBase }              from '../../_models/form-base';
import { FormControlService }    from '../../_service/form-control.service';
import {ApiService} from '../../../config/api.service';
 

@Component({
  selector: 'app-jp-dynamic-form',
  templateUrl: './jp-dynamic-form.component.html',
  styleUrls: ['./jp-dynamic-form.component.scss'],
  providers: [ FormControlService ]
})
export class JpDynamicFormComponent implements OnInit {

  @Input() models: FormBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
 
  constructor(private fcs: FormControlService, private submitService: ApiService ) {  }
 
  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.models);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    /*this.submitService.createFactory(this.form.value).subscribe(response => {
      response = this.form.value;
      console.log(response);
    });*/
  }
}
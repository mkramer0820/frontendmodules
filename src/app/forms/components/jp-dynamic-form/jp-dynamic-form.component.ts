import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { FormBase }              from '../../_models/form-base';
import { FormControlService }    from '../../_service/form-control.service';
 

@Component({
  selector: 'app-jp-dynamic-form',
  templateUrl: './jp-dynamic-form.component.html',
  styleUrls: ['./jp-dynamic-form.component.scss'],
  providers: [ FormControlService ]
})
export class JpDynamicFormComponent implements OnInit {

  @Input() tasks: FormBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
 
  constructor(private fcs: FormControlService) {  }
 
  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.tasks);
  }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
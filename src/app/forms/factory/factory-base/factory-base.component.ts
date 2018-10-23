import { ApiService } from './../../../config/api.service';
import { Component, OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core';
import { TaskFormService, FactoryFormService, OptionsService } from '../../_service/';
import { FormBase }     from '../../_models/form-base';
import { FormTextbox }  from '../../_models/form-textbox';
import { FormControlService } from 'src/app/pages/task/_models/forms/form-control.service';
import { FormGroup, FormArray, FormBuilder }                 from '@angular/forms';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-factory-base-form',
  template:
  `
<div>
  <app-factory-form [models]="models" [form]="form"></app-factory-form>
  <button (click)=toFormBase()>Button</button>

</div>
`,
  styleUrls: ['./factory-base.component.scss'],
  providers: [OptionsService, FormControlService]
})
export class FactoryBaseComponent implements OnInit, AfterContentChecked {

  modelItems: {} = {};
  models: any[];
  form: FormGroup;

  constructor(
    // private factoryFormService: FactoryFormService,
    private optionService: OptionsService,
    private fb: FormBuilder,
    private ffs: FactoryFormService,
    private fcs: FormControlService,
    ) { this.toFormBase(); }
  ngOnInit() {
    //this.subscription = this.optionService.getMessage().subscribe(models => this.models = models);

  }
  ngAfterContentChecked() {
    if (this.models.length < 1 ) {
      return this.toFormBase();
    } else { return }
  }
  

  toFormBase() {
    const items = []
    
    for (let item in this.optionService.newForm) {
      console.log('component', item);
      items.push(this.optionService.newForm[item]) 
    }
    this.models = items;
    this.form = this.fcs.toFormGroup(this.models);

    // return this.models = this.optionService.newForm;
  }

}

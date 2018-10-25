import { Component, OnInit, DoCheck } from '@angular/core';
import { TaskFormService, FactoryFormService, OptionsService } from '../_service/';
import { FormBase }     from '../_models/form-base';
import { FormTextbox }  from '../_models/form-textbox';
import { FormControlService } from 'src/app/pages/task/_models/forms/form-control.service';
import { FormGroup, FormArray, FormBuilder }                 from '@angular/forms';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-customer-form',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, DoCheck {

  modelItems: {} = {};
  models: any[];
  form: FormGroup;
  loading: boolean = true;

  constructor(
    private optionService: OptionsService,
    private fb: FormBuilder,
    private ffs: FactoryFormService,
    private fcs: FormControlService,
  ) { }

  ngOnInit() {
  }
  ngDoCheck() {

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

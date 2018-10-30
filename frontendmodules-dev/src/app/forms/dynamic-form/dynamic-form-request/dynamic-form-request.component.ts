import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';
import {AppConfig} from '../../../config/app.config';
import { TaskFormService, FactoryFormService, OptionsFormService } from '../../_service/';
import { FormBase }     from '../../_models/form-base';
import { FormTextbox }  from '../../_models/form-textbox';
import { FormControlService } from 'src/app/pages/task/_models/forms/form-control.service';
import { FormGroup, FormArray, FormBuilder }                 from '@angular/forms';
import {Subscription} from 'rxjs';
import {ElementRef, ViewContainerRef} from '@angular/core';
import {MessageService} from '../../../_services/message.service';

@Component({
  selector: 'dynamic-form-request',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [MessageService, FormControlService]
})
export class DynamicFormRequestComponent implements OnInit {

  // modelItems: {} = {};
  models: any[];
  form: FormGroup;
  seturl: any;
  subscription: Subscription;
  @Input() formurl: string;
  @Input() hidden: boolean = true;

  // loading: boolean = true;

  constructor(
    // private factoryFormService: FactoryFormService,
    private urlServ: MessageService,
    private formService?: OptionsFormService,
    private ffs?: FactoryFormService,
    private fcs?: FormControlService,
    ) { this.subscription = this.urlServ.getUrl().subscribe(url => this.seturl = url);}
  ngOnInit() {
    //this.subscription = this.optionService.getMessage().subscribe(models => this.models = models);
    this.getForm()
  }
  
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.urlServ.clearUrl();
  }

  getForm() {
    this.seturl = AppConfig.urlOptions.customer
    this.formService.formRequest(AppConfig.urlOptions.customer).subscribe(response => {
      this.models = response;
      this.form = this.fcs.toFormGroup(this.models);
    });
    // this.models.push(models);
    // this.form = this.fcs.toFormGroup(this.models)
  }
  
}

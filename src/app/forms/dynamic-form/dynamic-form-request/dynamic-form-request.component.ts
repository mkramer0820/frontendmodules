import { Component, OnInit, DoCheck, OnDestroy, Input, Inject, AfterViewChecked } from '@angular/core';
import {AppConfig} from '../../../config/app.config';
import { TaskFormService, FactoryFormService, OptionsFormService } from '../../_service/';
import { FormBase }     from '../../_models/form-base';
import { FormTextbox }  from '../../_models/form-textbox';
import { FormControlService } from 'src/app/pages/task/_models/forms/form-control.service';
import { FormGroup, FormArray, FormBuilder }                 from '@angular/forms';
import {Subscription} from 'rxjs';
import {ElementRef, ViewContainerRef} from '@angular/core';
import {MessageService} from '../../../_services/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  url: string;
  formData?: any;
  update: boolean;
}

@Component({
  selector: 'dynamic-form-request',
  templateUrl: './dynamic-form-request.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [MessageService, FormControlService]
})
export class DynamicFormRequestComponent implements OnInit, DoCheck, AfterViewChecked, OnDestroy {

  // modelItems: {} = {};
  models: any[];
  form: FormGroup;
  seturl: any;
  id: any;
  // loading: boolean = true;

  constructor(
    // private factoryFormService: FactoryFormService,
    private urlServ: MessageService,
    private formService: OptionsFormService,
    private ffs: FactoryFormService,
    private fcs: FormControlService,
    public dialogRef: MatDialogRef<DynamicFormRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData

    ) { }
  ngOnInit() {
    //this.subscription = this.optionService.getMessage().subscribe(models => this.models = models);
    this.getForm();
    console.log(this.data.formData.controls.values);
  }
  ngDoCheck(): void {
    if (this.data.update === true && this.id === null) {
      this.getFormGroup();
    } else {

      return;
    }
  }
  ngAfterViewChecked() {

  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  getForm() {
    this.seturl = this.data.url;
    this.formService.formRequest(this.data.url).subscribe(response => {
      this.models = response;
      this.form = this.fcs.toFormGroup(this.models);
    });
    if (this.data.update === true) {
      this.getFormGroup();
    }
  }
  getFormGroup() {
    let data = this.data.formData;
    for (let obj in data) {
      if (this.form.get(obj) != null) {
        let value = data[obj];
        let key = obj;
        this.form.get(key).setValue(value);
      }
    }
    this.id = this.data.formData.id;
  }
}

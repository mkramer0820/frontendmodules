import { Component, OnInit, DoCheck, OnDestroy, Input, Inject, AfterViewChecked } from '@angular/core';
import { OptionsFormService } from '../../_service/';
import { FormControlService } from '../../_service/form-control.service';
import { FormGroup}                 from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  url: string;
  formData?: any;
  update?: boolean;
}

@Component({
  selector: 'dynamic-form-request',
  templateUrl: './dynamic-form-request.component.html',
  styleUrls: ['./dynamic-form-request.component.scss'],
  providers: [FormControlService]
})
export class DynamicFormRequestComponent implements OnInit, DoCheck, AfterViewChecked, OnDestroy {

  // modelItems: {} = {};
  models: any[];
  form: FormGroup;
  seturl: any;
  id: any;
  update: boolean = this.data.update;
  loading: boolean;
  @Input() inputData: any;
  
  // loading: boolean = true;

  constructor(
    // private factoryFormService: FactoryFormService,
    private formService: OptionsFormService,
    private fcs: FormControlService,
    public dialogRef: MatDialogRef<DynamicFormRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }
 
  ngOnInit() {
    this.getForm();
  }
  ngDoCheck() {
    
  }
  ngAfterViewChecked() {

  }
  ngOnDestroy() {

  }

  getForm() {
    this.loading = true;
    this.update = this.data.update;
    if (this.data.update) {
      this.seturl = `${this.data.url}${this.data.formData.id}/`;
      this.formService.formRequest(this.data.url)
      .subscribe(response => {
        let models = response;
        this.models = this.updateModels(models);
        this.form = this.fcs.toFormGroup(this.models);
        this.loading = false;
      });
    } else {
      this.seturl = `${this.data.url}`;
      this.formService.formRequest(this.data.url)
      .subscribe(response => {
        let models = response;
        this.models = this.updateModels(models);
        this.form = this.fcs.toFormGroup(this.models);
      },
      e => console.log(e),
      () => this.loading = false,

      );
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
  updateModels(_models) {
    let formd: {} = {};
    for (let formdata of _models) {
      formd[formdata.key] = formdata;
    }
    for (let item in this.data.formData) {
      if (formd.hasOwnProperty(item)) {
        console.log(formd[item])
        if (formd[item].controlType === 'image_upload') {
          formd[item].value = null;
        } else {
          formd[item].value = this.data.formData[item]
        }
      }
    }
    console.log(formd)
    const newmodel = Object.values(formd);
    return newmodel;
  }
}


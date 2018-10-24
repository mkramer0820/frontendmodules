import { ApiService } from './../../../config/api.service';
import { Component, OnInit, DoCheck } from '@angular/core';
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
  <mat-dialog-content>
    <mat-card>
      <div *ngIf="loading; else loaded">
          <mat-spinner color='accent' style="margin:0 auto;" mode="indeterminate"></mat-spinner>
      </div>

      <ng-template #loaded>
      <app-factory-form [models]="models" [form]="form"></app-factory-form>
      <button (click)=toFormBase()>Button</button>
      </ng-template>

    </mat-card>
  </mat-dialog-content>
`,
  styleUrls: ['./factory-base.component.scss'],
  providers: [OptionsService, FormControlService]
})
export class FactoryBaseComponent implements OnInit, DoCheck {

  modelItems: {} = {};
  models: any[];
  form: FormGroup;
  loading: boolean = true;

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
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.models.length < 1 ) {
      return this.toFormBase();
    } else { return }
  }
  

  toFormBase() {
    this.loading = true;
    const items = [];
    this.optionService.optionsRequest();
    
    for (let item in this.optionService.newForm) {
      console.log('component', item);
      items.push(this.optionService.newForm[item]) 
    }
    this.models = items;
    this.form = this.fcs.toFormGroup(this.models);
    this.loading = true;

    // return this.models = this.optionService.newForm;
  }

}

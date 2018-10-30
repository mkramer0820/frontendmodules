import { ApiService } from './../../../config/api.service';
import { Component, OnInit, DoCheck, Input } from '@angular/core';
import {AppConfig} from '../../../config/app.config';
import { TaskFormService, FactoryFormService, OptionsService, OptionsFormService } from '../../_service/';
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
      <app-factory-form [submitUrl]=seturl [models]="models" [form]="form"></app-factory-form>
      </ng-template>

    </mat-card>
  </mat-dialog-content>
`,
  styleUrls: ['./factory-base.component.scss'],
  providers: [FormControlService]
})
export class FactoryBaseComponent implements OnInit {


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
    private formService: OptionsFormService,
    private ffs?: FactoryFormService,
    private fcs?: FormControlService,
    ) { }
  ngOnInit() {
    //this.subscription = this.optionService.getMessage().subscribe(models => this.models = models);
    this.getForm()
  }
  
  getForm() {
    this.seturl = AppConfig.urlOptions.factory
    this.formService.formRequest(AppConfig.urlOptions.factory).subscribe(response => {
      this.models = response;
      this.form = this.fcs.toFormGroup(this.models);
    });
    // this.models.push(models);
    // this.form = this.fcs.toFormGroup(this.models)
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormsComponent } from './dynamic-form/dynamic-forms.component';
import {FormComponent} from './dynamic-form/form/form.component';
import {FilterFormComponent} from './dynamic-form/filter-form/filter-form.component';
import {DynamicFormRequestComponent} from './dynamic-form/dynamic-form-request/dynamic-form-request.component';
import {OptionsFormService} from './_service/option-form.service';
import {DatePickerComponent} from './date-picker/date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    DynamicFormsComponent,
    FormComponent,
    FilterFormComponent,
    DynamicFormRequestComponent,
  ],
  declarations: [
    DynamicFormsComponent,
    FormComponent,
    FilterFormComponent,
    DynamicFormRequestComponent,
    DatePickerComponent,
  ],
  entryComponents: [
    DynamicFormRequestComponent
  ],
  providers: [
    OptionsFormService
  ]
})
export class JpFormsModule { }

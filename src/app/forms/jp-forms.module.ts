import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormsComponent } from './dynamic-form/dynamic-forms.component';
import {FormComponent} from './dynamic-form/form/form.component';
import {DynamicFormSnackBar} from './_snackbar/dynamic-form-snackbar';
import {FilterFormInputComponent} from './dynamic-form/filter-form/filter-form-input/filter-form-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    DynamicFormsComponent,
    FormComponent,

    
  ],
  exports: [ FormComponent]
})
export class JpFormsModule { }

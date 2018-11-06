import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JpFormsComponent } from './components/jp-forms.component';
import { JpDynamicFormComponent } from './components/jp-dynamic-form/jp-dynamic-form.component';
import { JpDynamicFormTaskSetComponent } from './components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormsComponent } from './dynamic-form/dynamic-forms.component';
import {FormComponent} from './dynamic-form/form/form.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    JpFormsComponent,
    JpDynamicFormComponent,
    DynamicFormsComponent,
    JpDynamicFormTaskSetComponent,
    FormComponent,
    
  ],
  exports: [JpFormsComponent, JpDynamicFormComponent, JpDynamicFormTaskSetComponent, FormComponent]
})
export class JpFormsModule { }

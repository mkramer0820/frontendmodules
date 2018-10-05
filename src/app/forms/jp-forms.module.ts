import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JpFormsComponent } from './components/jp-forms.component';
import { JpDynamicFormComponent } from './components/jp-dynamic-form/jp-dynamic-form.component';
import { JpDynamicFormTaskSetComponent } from './components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [JpFormsComponent, JpDynamicFormComponent, JpDynamicFormTaskSetComponent]
})
export class JpFormsModule { }

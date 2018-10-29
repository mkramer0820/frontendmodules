import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JpFormsComponent } from './components/jp-forms.component';
import { JpDynamicFormComponent } from './components/jp-dynamic-form/jp-dynamic-form.component';
import { JpDynamicFormTaskSetComponent } from './components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FactoryFormComponent } from './factory/factory-form/factory-form.component';
import { SharedModule } from '../shared/shared.module';
import { FactoryBaseComponent } from './factory/factory-base/factory-base.component';
import { DynamicFormsComponent } from './dynamic-form/dynamic-forms.component';

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
    FactoryFormComponent,
    FactoryBaseComponent,
    
  ],
  exports: [FactoryBaseComponent, JpFormsComponent, JpDynamicFormComponent, JpDynamicFormTaskSetComponent, FactoryFormComponent]
})
export class JpFormsModule { }

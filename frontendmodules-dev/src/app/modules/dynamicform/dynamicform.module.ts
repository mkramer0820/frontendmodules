import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';


import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {DynamicFormTaskComponent} from './dynamic-form-task/dynamic-form-task.component';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormTaskComponent,
    DynamicComponent
    ],
  providers: [
  ],

})
export class DynamicformModule { }

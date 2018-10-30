import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {TaskBase} from '../models/task-base';

@Component({
  selector: 'app-task',
  templateUrl: './dynamic-form-task.component.html',
  styleUrls: ['./dynamic-form-task.component.scss']
})
export class DynamicFormTaskComponent{

  @Input() task: TaskBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.task.key].valid; }
}

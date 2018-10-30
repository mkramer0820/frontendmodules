import { Injectable } from '@angular/core';
import {TaskBase} from './models/task-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskControlService {

  constructor() { }

  toFormGroup(tasks: TaskBase<any>[] ) {
    let group: any = {};

    tasks.forEach(task => {
      group[task.key] = task.required ? new FormControl(task.value || '', Validators.required)
                                      : new FormControl(task.value || '');
  });
  return new FormGroup(group);
  }
}

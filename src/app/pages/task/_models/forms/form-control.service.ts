import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskGroupBase } from './task-group-base';

@Injectable()
export class FormControlService {
  constructor() { }

  toFormGroup(options: TaskGroupBase<any>[] ) {
    let group: any = {};

    options.forEach(option => {
      group[option.key] = option.required ? new FormControl(option.value || '', Validators.required)
                                              : new FormControl(option.value || '');
    });
    return new FormGroup(group);
  }
}

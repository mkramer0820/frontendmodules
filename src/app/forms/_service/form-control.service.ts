import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '../_models/form-base';



@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(tasks: FormBase<any>[] ) {
    let group: any = {};

    tasks.forEach(task => {
      group[task.key] = task.required ? new FormControl(task.value || '', Validators.required)
                                              : new FormControl(task.value || '');
    });
    return new FormGroup(group);
  }
}


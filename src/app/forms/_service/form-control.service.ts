import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '../_models/form-base';

// model = tasks 
// item = task

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(models: FormBase<any>[] ) {
    let group: any = {};

    models.forEach(item => {
      group[item.key] = item.required ? new FormControl(item.value || '', Validators.required)
                                              : new FormControl(item.value || '');
    });
    return new FormGroup(group);
  }
}


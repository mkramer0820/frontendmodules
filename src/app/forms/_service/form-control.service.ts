import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '../_models/form-base';



@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(forms: FormBase<any>[] ) {
    let group: any = {};

    forms.forEach(form => {
      group[form.key] = form.required ? new FormControl(form.value || '', Validators.required)
                                              : new FormControl(form.value || '');
    });
    return new FormGroup(group);
  }
}


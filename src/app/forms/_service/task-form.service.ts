import { Injectable }       from '@angular/core';
 
import { FormDropdown } from '../_models/form-dropdown';
import { FormBase }     from '../_models/form-base';
import { FormTextbox }  from '../_models/form-textbox';
 

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {

  constructor() { }

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getForms() {
 
    let forms: FormBase<any>[] = [
 
      new FormDropdown({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
 
      new FormTextbox({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),
 
      new FormTextbox({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];
 
    return forms.sort((a, b) => a.order - b.order);
  }
}

import { ApiService } from './../../config/api.service';
import { Injectable }       from '@angular/core';
 
import { FormDropdown } from '../_models/form-dropdown';
import { FormBase }     from '../_models/form-base';
import { FormTextbox }  from '../_models/form-textbox';
import {Observable, /*of, throwError as observableThrowError*/ } from 'rxjs';
import { NewFactory } from '../_models/factory-models/factory-model';
import { Factory } from 'src/app/modules/models/factory.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryFormService {

  private factory = new NewFactory();

  constructor() {}

   // TODO: make asynchronous
  getForms() {
 
    let factory: FormBase<any>[] = [
 
      new FormTextbox({
        key: 'name',
        label: 'Factory Name',
        type: 'text',
        order: 1
      }),
      new FormTextbox({
        key: 'address1',
        label: 'Address 1',
        type: 'text',
        order: 2
      }),
      new FormTextbox({
        key: 'address2',
        label: 'Address 2',
        type: 'text',
        order: 3
      }),
      new FormTextbox({
        key: 'address3',
        label: 'Address 3',
        type: 'text',
        order: 4
      }),
      new FormTextbox({
        key: 'country',
        label: 'Country',
        type: 'text',
        order: 5
      }),
      new FormTextbox({
        key: 'state',
        label: 'State',
        type: 'text',
        order: 6
      }),
      new FormTextbox({
        key: 'zip',
        label: 'Zip',
        type: 'text',
        order: 7
      }),
      new FormTextbox({
        key: 'email',
        label: 'Factory Base Email',
        type: 'email',
        order: 8
      }),
      new FormTextbox({
        key: 'phone',
        label: 'Phone Number',
        type: 'tel',
        order: 9
      }),
      new FormTextbox({
        key: 'website',
        label: 'Webiste',
        type: 'text',
        order: 10
      }),
      new FormTextbox({
        key: 'description',
        label: 'Description - notes',
        type: 'textbox',
        order: 11
      }),
    ];
    return factory.sort((a, b) => a.order - b.order);
  }
}



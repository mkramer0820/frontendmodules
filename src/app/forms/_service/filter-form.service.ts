import { Injectable }       from '@angular/core';
import { FormDropdown } from '../_models/form-dropdown';
import { FormBase }     from '../_models/form-base';
import { FormTextbox }  from '../_models/form-textbox';
import { FormDatePicker } from '../_models/form-date-picker';

@Injectable({
  providedIn: 'root'
})
export class FilterFormService {
  constructor() {}
  getForms(buyers) {
    let date = new Date()
    let buyerOpt: {} = {}
    buyerOpt[buyers] = buyers;

    let filter: FormBase<any>[] = [
      /*new FormDropdown({
        key: 'customer',
        label: 'Buyer',
        controlType: 'dropdown',
        required: false,
        text: 'text',
        options: buyerOpt,
        order: 1,
      }),*/
      new FormTextbox({
        key: 'buyer_style_number',
        label: 'Buyer Style Number',
        value: '',
        controlType: 'textbox',
        type: 'text',
        required: false,
        order: 2
      }),
      new FormTextbox({
        key: 'jp_style_number',
        label: 'JP Style Number',
        value: '',
        controlType: 'textbox',
        type: 'text',
        required: false,
        order: 3
      }),
      new FormDatePicker({
        key: 'start_date',
        value: '',
        label: 'Start Date',
        controlType: 'datepicker',
        required: false,
        order: 4,
      }),
      new FormDatePicker({
        key: 'end_date',
        value: '',
        label: 'End Date Date',
        controlType: 'datepicker',
        required: false,
        order: 5,
      })
    ]
    
    return filter.sort((a, b) => a.order - b.order);
  }
}



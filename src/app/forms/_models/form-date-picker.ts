import {FormBase} from './form-base';

export class FormDatePicker extends FormBase<boolean> {
    controlType = 'datepicker'
    type: string;
  
    constructor(options: {} = {} ) {
      super(options);
      this.type = options['type'] || '';
    }
  }
  
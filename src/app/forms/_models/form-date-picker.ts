import {FormBase} from './form-base';

export class FormDatePicker extends FormBase<string> {
    controlType = 'datepicker';
    type: string;
  
    constructor(options: {} = {} ) {
      super(options);
      this.type = options['type'] || '';
    }
  }
  
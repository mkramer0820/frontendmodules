import {FormBase} from './form-base';

export class FormImageField extends FormBase<boolean> {
    controlType = 'image_upload'
    type: string;
  
    constructor(options: {} = {} ) {
      super(options);
      this.type = options['type'] || '';
    }
  }
  
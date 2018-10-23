import { FormBase } from './form-base';

export class FormTextbox extends FormBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormCheckBox extends FormBase<boolean> {
  controlType = 'checkbox'
  type: boolean;

  constructor(options: {} = {} ) {
    super(options);
    this.type = options['type'] || '';
  }
}

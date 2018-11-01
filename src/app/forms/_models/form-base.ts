
export class FormBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  max_length: number;
  lengthValidator: string;
 
  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      max_length?: number,
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.max_length = options.max_length;
    this.lengthValidator = this.stringify();

  }
  stringify() {
    return this.lengthValidator = String(this.max_length);
  }
}
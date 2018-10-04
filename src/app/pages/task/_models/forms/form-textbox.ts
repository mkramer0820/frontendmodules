import { TaskGroupBase } from './task-group-base';

export class TextboxQuestion extends TaskGroupBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
import { FormBase }     from '../../_models/form-base';

@Component({
  selector: 'app-jp-dynamic-form-task-set',
  templateUrl: './jp-dynamic-form-task-set.component.html',
  styleUrls: ['./jp-dynamic-form-task-set.component.scss']
})
export class JpDynamicFormTaskSetComponent {

  @Input() item: FormBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.item.key].valid; }
}


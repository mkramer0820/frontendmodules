import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
import { FormBase }     from './../_models/form-base';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.html',
  styleUrls: ['./dynamic-forms.scss']
})
export class DynamicFormsComponent {

  @Input() item: FormBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.item.key].valid; }
}


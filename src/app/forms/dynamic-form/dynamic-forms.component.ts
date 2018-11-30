import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
import { FormBase }     from './../_models/form-base';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormManyDropDown} from '../_models/form-dropdown';



const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.html',
  styleUrls: ['./dynamic-forms.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
  ]
})
export class DynamicFormsComponent {

  multi: any[] = [];
  @Input() item: FormBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.item.key].valid; }
  max_len: string;
  onFileChanged(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
      this.form.patchValue({
        sweater_image: reader.result
        });
      }
    }
  }
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.get('sweater_image').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  change(event) {
    console.log(event)
    /*
    if(event.isUserInput) {
      if (event.source.selected === true) {
        let source = event.source._changeDetectorRef._view.parent.component.item
        if (source instanceof FormManyDropDown) {
          console.log('got it')
          let key = source.key
          if (event.source.selected === true) {
            let currvalue = this.form.get(key).value;
            console.log(currvalue)
            console.log(currvalue.indexOf(source.value))
          }
          if (event.source.selected === false ) { 
            let currvalue = this.form.get(key).value;
            for (let item of currvalue) {
              if (item === event.value) {
                console.log(currvalue.indexOf(item))
              }
            }
            console.log(currvalue)
            currvalue.indexOf(key)
        }
      }


      
      }
      console.log(event.source.value, event.source.selected);
    }*/
  }
  maxLength(event: any) {
    this.max_len = event.toString();
  }
}


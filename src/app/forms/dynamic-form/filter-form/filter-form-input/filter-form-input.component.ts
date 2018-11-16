import { Component, AfterViewInit, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlService} from '../../../_service/form-control.service'

@Component({
  selector: 'app-filter-form-input',
  templateUrl: './filter-form-input.component.html',
  styleUrls: ['./filter-form-input.component.scss'],
  providers: [FormControlService],
})
export class FilterFormInputComponent implements AfterViewInit {

  @Input() form: FormGroup
  @Input() items: any;

  constructor(private fcs: FormControlService) { }

  ngAfterViewInit() {
    this.fcs.toFormGroup(this.items);
  }

}

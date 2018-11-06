import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import {FilterFormService} from '../../_service/';
import {FormComponent} from '../form/form.component';
import { FormControlService }    from '../../_service/form-control.service';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  providers: [FormControlService, FilterFormService]
})
export class FilterFormComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  models: any;
  @ViewChild(FormComponent) filters: any;
  @Input() options: any;
  constructor( private ffs: FilterFormService, private fcs: FormControlService) { this.models = this.getForm();
  }

  ngOnInit() {
    this.models = this.getForm();
    this.form = this.fcs.toFormGroup(this.models)
  }
  ngAfterViewInit() {
   // this.filters = this.filters.form.value
  }

  getForm() {
    return this.ffs.getForms(this.options)
  }    
}

import { Component, OnInit, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
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

  @Input() filterForm: FormGroup;
  models: any;
  @Output() filtersEvent = new EventEmitter<any>();
  filtermessage = 'Hola Mundo!';

  @Input() options: any;
  constructor( private ffs: FilterFormService, private fcs: FormControlService) { this.models = this.getForm();
  }

  ngOnInit() {
    this.models = this.getForm();
    this.filterForm = this.fcs.toFormGroup(this.models)
  }
  ngAfterViewInit() {
   // this.filters = this.filters.form.value
  }


  getForm() {
    return this.ffs.getForms(this.options)
  }    
  sentFilters() {
    this.filtersEvent.emit(this.filterForm.value)
  }
}

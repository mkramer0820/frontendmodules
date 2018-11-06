import { ApiService } from './../../config/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { TaskFormService, FilterFormService } from '../_service/';

@Component({
  selector: 'app-jp-forms',
  template:
  `
    <div>
      <h2>Filter Form</h2>
      <app-jp-dynamic-form [models]="models"></app-jp-dynamic-form>
    </div>
  `,
  providers: [TaskFormService, FilterFormService]

})
export class JpFormsComponent implements OnInit {

  @Input() filters: any;
  models: any;

  constructor(
    service: TaskFormService,
    private filterFormService: FilterFormService,
    ) {
    // this.tasks = service.getTaskGroups();
    this.models = filterFormService.getForms(this.filters);
  }
  ngOnInit() {
  }

  getTaskGroups() {
    return this.filterFormService.getForms(this.models);
  }

}

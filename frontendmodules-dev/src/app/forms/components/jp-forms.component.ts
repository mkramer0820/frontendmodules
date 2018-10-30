import { ApiService } from './../../config/api.service';
import { Component, OnInit } from '@angular/core';
import { TaskFormService, FactoryFormService } from '../_service/';

@Component({
  selector: 'app-jp-forms',
  template:
  `
    <div>
      <h2>Task Form</h2>
      <app-jp-dynamic-form [models]="models"></app-jp-dynamic-form>
    </div>
  `,
  providers: [TaskFormService, FactoryFormService]

})
export class JpFormsComponent implements OnInit {

  models: any[];

  constructor(
    service: TaskFormService,
    // private taskService: TaskFormService,
    private factoryFormService: FactoryFormService,
    ) {
    // this.tasks = service.getTaskGroups();
    this.models = factoryFormService.getForms();
  }
  ngOnInit() {
  }

  getTaskGroups() {
    return this.factoryFormService.getForms();
  }

}

import { ApiService } from './../../config/api.service';
import { Component, OnInit } from '@angular/core';
import { TaskFormService } from '../_service/task-form.service';

@Component({
  selector: 'app-jp-forms',
  template:
  `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-jp-dynamic-form [tasks]="tasks"></app-jp-dynamic-form>
    </div>
  `,
  styleUrls: ['./jp-forms.component.scss'],
  providers: [TaskFormService]
})
export class JpFormsComponent implements OnInit {

  tasks: any[];

  constructor(
    service: TaskFormService,
    private taskService: TaskFormService,
    ) {
    // this.tasks = service.getTaskGroups();
    this.tasks = service.getForms2();
  }
  ngOnInit() {
  }

  getTaskGroups() {
    return this.taskService.getTaskGroups();
  }

}

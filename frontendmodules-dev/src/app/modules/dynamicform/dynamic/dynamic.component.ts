import { Component, OnInit } from '@angular/core';
import { TaskService} from '../task.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dynamic',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [tasks]="tasks"></app-dynamic-form>
    </div>
  `,
  providers:  [TaskService]
})
export class DynamicComponent implements OnInit  {
  tasks: any;
  todos: any;
  subscription: Subscription;


  constructor(
    private service: TaskService,
  ) {
    //this.tasks = this.service.getTasks();
    // this.tasks = this.service.getTaskDetail();
  }
  ngOnInit() {}
}

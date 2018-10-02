import { Component, OnInit, Input } from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { TaskBase }              from '../models/task-base';
import { TaskControlService }    from '../task-control.service';
import {ApiService} from '../../../config/api.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ TaskControlService ]

})
export class DynamicFormComponent implements OnInit {

  @Input() tasks: TaskBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(
    private tcs: TaskControlService,
    private http: ApiService,
  ) {  }

  ngOnInit() {

    this.form = this.tcs.toFormGroup(this.tasks);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
  getTasks() {
    this.http.getTaskDetail('14').subscribe(tasks => {
      console.log(tasks);

    })
  }
}

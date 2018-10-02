import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {TaskGroup, Todos} from '../../../modules/models/task.model';
import {ApiService} from '../../../config/api.service';

@Component({
  selector: 'app-generate-order-task',
  templateUrl: './generate-order-task.component.html',
  styleUrls: ['./generate-order-task.component.scss']
})
export class GenerateOrderTaskComponent implements OnInit {

  taskForm: FormGroup;
  task: any = [];


  constructor(
    private fb: FormBuilder,
    private http: ApiService,
  ) {

  }


  ngOnInit() {
    this.http.getTaskDetail(14).subscribe(task => {
      console.log(task);
      this.task= task;
    });
  }
  /*
  this.http.getTaskDetail(14).subscribe(task => {
    console.log(task)
    this.task= task;
    this.taskForm = this.fb.group({
      todos_group: [] = task['id'],
      todos: this.fb.array(this.fb.group({
        todo: '' = task['todos']['todo'],
        comment: '' = task['todos']['comment'],
        duedate: '' =  task['todos']['duedate'],
      ]});
    )});
  });
  */

}

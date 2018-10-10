import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray,  FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from './_service/task-form-service.service';
import { ApiService } from '../../config/api.service';
import { TaskGroupService } from './_service/task-group.service';
import {Observable} from 'rxjs'
import {Todo, TodosForm, TaskForm} from '../_models';





@Component({
  selector: 'app-task',
  template:
  `
  <button mat-icon-button (click)="selectedUpdate()"> Update </button>
  <br />
  <button mat-icon-button (click)="selectedCreate()"> Create </button>

    <div [ngSwitch]="num">
      <div *ngSwitchCase="'1'"><app-task-set [title]="title" [sentGroups]="groups" [case]="num"></app-task-set></div>
      <div *ngSwitchCase="'2'"><app-task-set [title]="createTitle" [sentGroups]="groups" [case]="num"></app-task-set></div>
      <div *ngSwitchCase="'3'">Three</div>
      <div *ngSwitchDefault>Choose an Option</div>
    </div>

  `
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  title: any;
  createTitle: any;
  num: string;

  taskForm: FormGroup;
  taskFormSub: Subscription;

  // set_name: FormGroup;
  set_name: any;
  todos: FormArray;
  message: string;
  groupSub: Subscription;
  groups: Array<any> = [];
  orderTask = {};
  updateName = false;
  masterGroupMessage: any;
  selectedId: any;

  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
    private tgs: TaskGroupService,
  ) { }

  ngOnInit() {
    this.default();
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
        this.set_name = this.taskForm.get('set_name');
      });
    this.getTaskGroup();
    }
    getTaskGroup() {
      this.tgs.getMessage().subscribe(rsp => {
        this.groups = rsp;
      });
    }
  
  default() {
    this.num= '0';
  }
  
  selectedUpdate() {
    this.num = '1';
    return this.title = 'Update Existing Task Set';
    console.log('Update Selected')
  }
  selectedCreate() {
    this.num = '2';
    return this.createTitle = 'Create New Task Set';
    console.log('Update Selected');
  }
  
  }

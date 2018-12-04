import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormArray,  FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from './_service/task-form-service.service';
import { ApiService } from '../../config/api.service';
import { TaskGroupService } from './_service/task-group.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddTaskGroupComponent} from './add-task-group/add-task-group.component';





@Component({
  selector: 'app-task',
  template:
  `

  <mat-card>
    <div fxLayout="row" fxLayoutAlign="center" fxLayoutGap="10px">

    
        <mat-card-header>
            <mat-card-title>Choose An Option</mat-card-title>
        </mat-card-header>
  
        <div *ngIf="ordertask == true">
          <button mat-raised-button color="primary" (click)="openAddDialog()"> Create A Task Group </button>
          &nbsp;
          <button mat-raised-button color="primary" (click)="selectedUpdate()"> Update A Task Set </button>
          &nbsp;
          <button mat-raised-button color="primary" (click)="selectedCreate()"> Create A Task Set </button>
          &nbsp;
        </div>
    </div>
    

    <div *ngIf="ordertask == false">
        <button mat-raised-button (click)="selectedUpdateOrder()"> Add Tasks To Order </button>
    </div>

    <div [ngSwitch]="num">
        <div *ngSwitchCase="'1'">
            <app-task-set [title]="title" [(sentGroups)]="groups" [case]="num" [order]="databaseId"></app-task-set>
        </div>
        
        <div *ngSwitchCase="'2'">
            <app-task-set [title]="createTitle" [(sentGroups)]="groups" [case]="num"  [order]="databaseId"></app-task-set>
        </div>
        
        <div *ngSwitchCase="'3'">
            <app-task-set [title]="createTitle" [(OrderTask)]="ordertask"  [(sentGroups)]="groups"
                [case]="num"  [order]="databaseId"></app-task-set>
        </div>
        <div *ngSwitchDefault></div>
    </div>
  </mat-card>

  `,
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  title: any;
  createTitle: any;
  orderTitle: any;
  num: string;

  taskForm: FormGroup;
  taskFormSub: Subscription;
  
  // order compoent message
  @Input() databaseId: null;
  @Input() ordertask: boolean = true;
  
  defaultOrdertask = false;
  // set_name: FormGroup;
  set_name: any;
  todos: FormArray;
  message: string;
  groupSub: Subscription;
  groups: any;
  orderTask = {};
  updateName = false;
  masterGroupMessage: any;
  selectedId: any;

  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
    private tgs: TaskGroupService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.default();
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
        this.set_name = this.taskForm.get('set_name');
      });
    this.getTaskGroups();
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
    this.getTaskGroup();
    return this.title = 'Update Existing Task Set';
    console.log('Update Selected')
  }
  selectedUpdateOrder() {
    
    this.getTaskGroups();
    this.num = '3';
    return this.orderTitle = 'Add Task Set To Group';
    console.log('Update Selected')
  }
  selectedCreate() {
    this.getTaskGroup();
    this.num = '2';
    return this.createTitle = 'Create New Task Set';
    console.log('Update Selected');
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddTaskGroupComponent, {
      width:'300px',
      height: '150px',
    });
    dialogRef.afterClosed().subscribe(rsp => {
      this.tgs.getTaskGroups();
      rsp = this.tgs.getMessage();
    });
  }
  getTaskGroups() {
    this.apiService.getTaskGroups().subscribe(resp => {
      return this.groups = resp;
      console.log(this.groups);
    });
  }
}

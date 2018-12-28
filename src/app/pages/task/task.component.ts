import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from './_service/task-form-service.service';
import { TaskGroupService } from './_service/task-group.service';
import {MatDialog} from '@angular/material';
import {AddTaskGroupComponent} from './add-task-group/add-task-group.component';
import { HttpClientService } from '@app/_services/http-client.service';
import {AppConfig} from 'app/config/app.config';





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
          <button mat-raised-button [ngClass]="{'first': true, 'second': true, 'third': false}" color="primary" (click)="openAddDialog()"> Create A Task Group </button>
          &nbsp;
          <button mat-raised-button color="primary" (click)="switchCases(1)"> Update A Task Set </button>
          &nbsp;
          <button mat-raised-button color="primary" (click)="switchCases(2)"> Create A Task Set </button>
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
            <app-task-set [title]="title" [(sentGroups)]="groups" [case]="num"  [order]="databaseId"></app-task-set>
        </div>
        
        <div *ngSwitchCase="'3'">
            <app-task-set [title]="title" [(OrderTask)]="ordertask"  [(sentGroups)]="groups"
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
  num: number;

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
    private http: HttpClientService,
    private tgs: TaskGroupService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
        this.set_name = this.taskForm.get('set_name');
      });
    this.getTaskGroups();
    }
  
  clearTodosForm() {
      // this.taskFormService.clearForm();
      this.taskFormService.clearTodos();
  }
  switchCases(casenum) {
  
    switch (casenum) {
      case (1):
          this.title = 'Update Existing Task Set';
          this.num = casenum;
          this.clearTodosForm()
          this.getTaskGroups()

          break;
      case (2):
        this.title = 'Create New Task Set'
        this.num = casenum
        this.clearTodosForm()
        this.getTaskGroups()

          break; 
      case (3):
        this.num = casenum
        this.title = 'Add Task Set To Group'
        this.clearTodosForm()
        this.getTaskGroups()


        break;
    }
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(AddTaskGroupComponent, {
      width:'300px',
      height: '150px',
    });
    dialogRef.afterClosed().subscribe(rsp => {
      rsp = this.tgs.getMessage();
      this.getTaskGroups();
    });
  }
  getTaskGroups() {
    this.http.get(AppConfig.urlOptions.taskGroup).subscribe(resp => {
      return this.groups = resp;
    });
  }
}

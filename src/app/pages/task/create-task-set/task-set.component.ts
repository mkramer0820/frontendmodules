import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from '../_service/task-form-service.service';
import { ApiService } from '../../../config/api.service';
import { TaskGroupService } from '../_service/task-group.service';
import {MatDialog } from '@angular/material';
import { AddTaskGroupComponent } from '../add-task-group/add-task-group.component';



@Component({
  selector: 'app-task-set',
  template:
`
    <h1>Update Group Blanket Task</h1>

  Task Group id: {{taskForm.controls.todos_group.value}}
  <br />
  <form [formGroup]="taskForm" >
    <!--<option [ngValue]="group" *ngFor="let group of mygroups">{{group.group_name}}</option>-->
    <mat-form-field class="form-element"> {{message}}
    <mat-select matInput  placeholder="Choose Group Set" formControlName='todos_group'>
      <mat-option *ngFor="let group of groups" value={{group.id}} message=group.id>
      {{group.group_name}}
      </mat-option>
    </mat-select>
    </mat-form-field>
    <button  type="open" mat-button-raised color="accent" (click)="openAddDialog()">Add New Task Groups</button>


    <br />

    <mat-form-field>
      <input matInput formControlName="set_name" placeholder="Set Name">
    </mat-form-field>

    <div *ngFor="let group of groups">
      {{group.group_names | json}}
      Set names: {{group.set_names | json}}
      <div *ngFor="let key of group.set_names">
        <div *ngIf="key.id in "
        id: {{key.id}} -- foundit

      </div>
    </div>


    <h3>Add Tasks To Set</h3>
    <button mat-button-raised color="primary"(click)="addTodos()">Add Todos</button>
    <ul>
      <li *ngFor="let todo of todos?.controls; let i = index">
        <app-todos [index]="i" [todosForm]="todo" (deletePlayer)="deleteTodos($event)"></app-todos>
      </li>
    </ul>

    <button  type="submit" mat-button-raised color="accent" (click)="saveTodos()" [disabled]="taskForm.invalid">Submit</button>
    &nbsp;
    <button  type="submit" mat-button-raised color="accent" (click)="clearTodosForm()" style="indent:50px">Clear Form</button>
    <pre>Parent Form Status: <span class="status">{{taskForm.status}} <br />{{taskForm.value | json}}</span></pre>
  </form>
  <button  type="submit" mat-button-raised color="accent" (click)="consoleTaskGroups()">Task Groups</button>
  <div>
  <button  type="submit" mat-button-raised color="accent" (click)="getBlanketTask()">Blanket Task</button>
  </div>

  `,
  styleUrls: ['./task-set.component.scss']
})
export class TaskSetComponent implements OnInit, OnDestroy {

  taskForm: FormGroup;
  taskFormSub: Subscription;
  todos: FormArray;
  formInvalid: boolean = false;
  groupSub: Subscription;
  myControl = new FormControl();
  options: string[] = [];
  groups: Array<any>;
  mygroups: Array<any> = [];
  message: string;

  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
    private tgs: TaskGroupService,
    private dialog: MatDialog,

  ) { this.getTaskGroup() }


  ngOnInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        console.log(task);
        this.todos = this.taskForm.get('todos') as FormArray;
      });
    this.getTaskGroup();
    }

    ngOnDestroy() {
      this.taskFormSub.unsubscribe();
    }
    addTodos() {
    this.taskFormService.addTodos();
    }

    deleteTodos(index: number) {
    this.taskFormService.deleteTodos(index);
    }

    saveTodos() {
      console.log('Todo saved!');
      console.log(this.taskForm.value);
      this.apiService.createTask(this.taskForm.value).subscribe(response => {
        console.log(response);
        });
    }
    consoleTaskGroups() {
      this.taskFormService.consoleTaskGroups();
    }
    getBlanketTask() {
      this.taskFormService.getBlanketTask('14');
    }
    clearTodosForm() {
      this.taskFormService.clearForm();
    }
    getTaskGroup() {
      this.tgs.getMessage().subscribe(rsp => {
        this.groups = rsp;
        for (let obj in rsp) {
          this.mygroups.push(rsp[obj])
        }
        return this.mygroups
      });
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
  }

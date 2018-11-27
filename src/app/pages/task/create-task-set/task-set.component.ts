import { Component, OnInit, OnDestroy, AfterViewInit, Input} from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder,  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from '../_service/task-form-service.service';
import { ApiService } from '../../../config/api.service';
import { TaskGroupService } from '../_service/task-group.service';
import {MatDialog } from '@angular/material';
import { AddTaskGroupComponent } from '../add-task-group/add-task-group.component';
import {Todo, TodosForm, TaskForm} from '../_models';
import { Router} from '@angular/router';


@Component({
  selector: 'app-task-set',
  template:
`


<div class="container"
     fxLayout
     fxLayout.xs="column"
     fxLayoutAlign="center"
     fxLayoutGap="10px"
     fxLayoutGap.xs="0">
  <div class="item item-1" fxFlex="20%"></div>
  <div class="item item-2" fxFlex="20%" fxFlexOrder="3"></div>
  <div class="item item-3" fxFlex>

    <mat-card>
      <mat-card-header>
        <mat-card-title>
          {{title}}
        </mat-card-title>
      </mat-card-header>
      <br />
      <form [formGroup]="taskForm" >

      
      <div fxLayout
      fxLayout.xs="column"
      fxLayoutAlign="center"
      fxLayoutGap="10px"
      fxLayoutGap.xs="0">
        <mat-form-field class="form-element" fxFLex="50%">
          <mat-select matInput  placeholder="Choose Group Set" formControlName='todos_group'>
            <mat-option *ngFor="let group of sentGroups; let i=index" value={{group.id}}
            (click)="setmasterGroupMessage(group)">
               <span class="mat-option-text">{{group.group_name}}</span>
            </mat-option>
          </mat-select>
        </mat-form-field>

        <ng-container *ngIf="masterGroupMessage">
          <mat-form-field class="form-element">
             <input type="text" placeholder="Choose Boiler Plate Task Or Add A New One" aria-label="Number" matInput [formControl]="set_name" [matAutocomplete]="auto"> 
                <mat-autocomplete #auto="matAutocomplete">
                  <mat-option *ngFor="let set of masterGroupMessage" value={{set.set_name}} (click)="getBlanketTask(set.id)">
                   {{set.set_name}}
                  </mat-option>
                </mat-autocomplete>
          </mat-form-field>
        </ng-container>
      </div>
        
      <h3>Add Tasks To Set</h3>
        <button mat-mini-fab color="primary"(click)="addTodos()"><mat-icon>add</mat-icon></button> Add Items To Set
        <ul>
          <li *ngFor="let todo of todos?.controls; let i = index">
            <app-todos [index]="i" [todosForm]="todo" [selectedId]="selectedId" (deleteTodos)="deleteTodos($event)"></app-todos>
          </li>
        </ul>

        <div [ngSwitch]="case">
          <div *ngSwitchCase="'1'">
          <button mat-mini-fab color="primary" type="submit" mat-button-raised  (click)="updateTodoSet()"
          [disabled]="taskForm.invalid"><mat-icon>update</mat-icon></button>Update 
          <button mat-button type="submit" mat-button-raised (click)="clearTodosForm()" style="indent:50px" color="primary">Clear Form</button>

          </div>
          <div *ngSwitchCase="'2'">
          <button mat-mini-fab color="primary"  type="submit" mat-button-raised (click)="saveTodos()"
          [disabled]="taskForm.invalid"><mat-icon>save</mat-icon></button> Save

          <button mat-button type="submit" mat-button-raised (click)="clearTodosForm()" style="indent:50px">Clear Form</button>

          </div>

        </div>
        
      
        &nbsp;
        &nbsp;
      </form>
      </mat-card>
    </div>
  </div>

  `,
  styleUrls: ['./task-set.component.scss']
})
export class TaskSetComponent implements OnInit, OnDestroy, AfterViewInit {

  // Message from task.component
  @Input() title: string;
  @Input() sentGroups: any;
  @Input() case: string;
  @Input() order: string;
  @Input() OrderTask: boolean = true;
  // end of message propery
  
  taskForm: FormGroup;
  taskFormSub: Subscription;

  // set_name: FormGroup;
  set_name: any;
  todos: FormArray;
  message: string;
  orderTask = {};
  updateName = false;
  masterGroupMessage: any;
  selectedId: any;
  updateId: string;

  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
    private tgs: TaskGroupService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router

  ) { this.getTaskGroup()}


  ngOnInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
        this.set_name = this.taskForm.get('set_name');
      });
    this.getTaskGroup();
    }
  ngAfterViewInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
        this.set_name = this.taskForm.get('set_name');
      });
    this.getTaskGroup();
    }
    ngOnDestroy() {
      // this.taskFormSub.unsubscribe();
      this.getTaskGroup();
    } 
   
    addTodos() {
     this.taskFormService.addTodos();
    }
    deleteTodos(index: number) {
    this.taskFormService.deleteTodos(index);
    }
    setmasterGroupMessage(event) {
      let set_names = event.set_names;
      this.masterGroupMessage = set_names;
      //console.log(message);
    }
    
      /**
   * After a form is initialized, we link it to our main form
   */

    saveTodos() {
      console.log('Todo saved!');
      console.log(this.taskForm.value);
      this.apiService.createTask(this.taskForm.value).subscribe(response => {
        console.log(response);
        });
      // this.clearTodosForm();
      this.taskFormService.clearForm();
      this.tgs.getTaskGroups();
      this.getTaskGroup();
    }
    getTodos(){
      this.apiService.getTaskDetail(this.selectedId).subscribe(todos => {
        console.log(todos['todos']);
        return this.todos = todos['todos'];
      });
    }
    

    clearTodosForm() {
      // this.taskFormService.clearForm();
      this.taskFormService.clearTodos();
    }
    getTaskGroup() {
      this.tgs.getMessage().subscribe(rsp => {
        this.sentGroups = rsp;
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
    getBlanketTask(id) {
      this.updateId = id;
      this.apiService.getTaskDetail(id).subscribe(res => {
        this.clearTodosForm();
        if (this.taskForm.get('todos').value.length == 0) {
          const todos = res['todos'];
          for (const todo in todos) {
            if (todos.hasOwnProperty(todo)) {
              const todoslist =  todos[todo];
              // const currentTask = this.taskForm.getValue();
              const currentTodos = this.taskForm.get('todos') as FormArray;
              currentTodos.push(
              this.fb.group(
                new TodosForm(new Todo(todoslist['todo'], ))
                )
              );
            }
          } 
        };
      });
    }
    updateTodoSet() {
      let id = this.updateId
      this.apiService.updateTask(id, this.taskForm.value).subscribe(response => {
        console.log(response);
      });
      this.clearTodosForm();
      this.tgs.getTaskGroups();
      this.getTaskGroup();


    }
  }
/*
getBlanketTask(id) {
      this.taskFormService.getBlanketTask(id);
    }
*/
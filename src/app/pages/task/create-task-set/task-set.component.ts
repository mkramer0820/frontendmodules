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
    <h1>{{title}} order id {{order}}</h1>
<!--  Task Group id: {{taskForm.controls.todos_group.value}} -->
  <br />
  <form [formGroup]="taskForm" >

  <mat-form-field class="form-element">
    <mat-select matInput  placeholder="Choose Group Set" formControlName='todos_group'>
      <mat-option *ngFor="let group of sentGroups; let i=index" value={{group.id}}
       (click)="setmasterGroupMessage(group)">
        <span class="mat-option-text">{{group.group_name}}</span>
      </mat-option>
    </mat-select>
    </mat-form-field>
    <button  type="open" mat-button-raised color="accent" (click)="openAddDialog()">Add New Task Groups</button>
  
  

    <div *ngIf="title == 'Create New Task Set'">
      <mat-form-field>
        <input matInput formControlName="set_name" placeholder="New Set Name">
      </mat-form-field>
    </div>
  
    
   <h3>Add Tasks To Set</h3>
    <button mat-button-raised color="primary"(click)="addTodos()">Add Todos</button>
    <ul>
      <li *ngFor="let todo of todos?.controls; let i = index">
        <app-todos [index]="i" [todosForm]="todo" [selectedId]="selectedId" (deleteTodos)="deleteTodos($event)"></app-todos>
      </li>
    </ul>

    {{case}}
    <div [ngSwitch]="case">
      <div *ngSwitchCase="'1'">
      <button  type="submit" mat-button-raised color="accent" (click)="updateTodoSet()"
      [disabled]="taskForm.invalid">Update</button>
      </div>
      <div *ngSwitchCase="'2'">
      <button  type="submit" mat-button-raised color="accent" (click)="saveTodos()"
      [disabled]="taskForm.invalid">Save New Task Set</button>
      </div>
    </div>
    
  
    <button  type="submit" mat-button-raised color="accent" (click)="clearTodosForm()" style="indent:50px">Clear Form</button>
    &nbsp;
    <button  type="submit" mat-button-raised color="accent" (click)="addToOrder()" [disabled]="taskForm.invalid">Add To Order Test</button>
    &nbsp;
    <pre>Parent Form Status: <span class="status">{{taskForm.status}} <br />{{taskForm.value | json}}</span></pre>
  </form>
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
      this.clearTodosForm();
      this.getTaskGroup();
    }
    getTodos(){
      this.apiService.getTaskDetail(this.selectedId).subscribe(todos => {
        console.log(todos['todos']);
        return this.todos = todos['todos'];
      });
    }
    addToOrder() {
      console.log('Todo saved!');
      let tasks = this.orderTask;
      let items = this.taskForm.value;
      tasks['order'] = '3';
      tasks['todos'] = items['todos'];
      tasks['set_name'] = items['set_name'];
      console.log(JSON.stringify(tasks));
      //console.log(this.taskForm.value);
      this.apiService.addTaskToOrder(tasks).subscribe(response => {
        console.log(response);
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
            } else {
            console.log('field');
            }
          }
        } else {
          console.log('error');
        }
      });
    }
    updateTodoSet() {
      this.apiService.updateTask(this.selectedId, this.taskForm.value).subscribe(response => {
        console.log(response);
      });
      this.clearTodosForm();
      this.router.navigate(['task-component']);
    }
  }
/*
getBlanketTask(id) {
      this.taskFormService.getBlanketTask(id);
    }
*/
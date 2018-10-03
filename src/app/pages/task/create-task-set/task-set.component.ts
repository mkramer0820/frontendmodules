import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from '../task-form-service.service';
import { ApiService } from '../../../config/api.service';
import { TaskGroupService } from '../task-group.service';


@Component({
  selector: 'app-task-set',
  template:
  `
  <p>
    task works!
    {{ groups | json }}
  </p>
  <button  type="submit" mat-button-raised color="accent" (click)="clearTodosForm()">Clear Form</button>
  <br />
  Task Group Name: {{taskForm.controls.todos_group.value}}
  <br />
  <form [formGroup]="taskForm" >
    <mat-form-field>
      <input matInput formControlName="set_name" placeholder="Set Name">
    </mat-form-field>
    <p>Todos:</p>
    <button mat-button-raised color="primary"(click)="addTodos()">Add Todos</button>
    <ul>
      <li *ngFor="let todo of todos?.controls; let i = index">
        <app-todos [index]="i" [todosForm]="todo" (deletePlayer)="deleteTodos($event)"></app-todos>
      </li>
    </ul>

    <button  type="submit" mat-button-raised color="accent" (click)="saveTodos()" [disabled]="taskForm.invalid">Submit</button>
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
  groups: any;


  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
    private tgs: TaskGroupService,
  ) { }


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
      this.taskFormService.getBlanketTask('1');
    }
    clearTodosForm() {
      this.taskFormService.clearForm();
    }
    getTaskGroup() {
      this.tgs.getMessage().subscribe(rsp => this.groups = rsp);
    }
  }
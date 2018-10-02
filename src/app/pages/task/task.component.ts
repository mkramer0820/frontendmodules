import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from './task-form-service.service';
import { ApiService } from '../../config/api.service';


@Component({
  selector: 'app-task',
  template:
  `
  <p>
    task works!
  </p>
  <form [formGroup]="taskForm" >
    Task Group Name: {{taskForm.controls.todos_group.value}}

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
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;
  taskFormSub: Subscription;
  todos: FormArray;
  formInvalid: boolean = false;
  //taskGroups: any;

  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
  ) { }


  ngOnInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        console.log(task);
        this.todos = this.taskForm.get('todos') as FormArray;
      })
    this.taskFormService.getTaskGroups();
    }
    ngOnDestroy() {
      this.taskFormSub.unsubscribe()
    }
    addTodos() {
    this.taskFormService.addTodos()
    }

    deleteTodos(index: number) {
    this.taskFormService.deleteTodos(index)
    }

    saveTodos() {
      console.log('team saved!')
      console.log(this.taskForm.value)
      this.apiService.createTask(this.taskForm.value).subscribe(response => {
        console.log(response)
        })
    }
    consoleTaskGroups() {
      this.taskFormService.consoleTaskGroups()
    }
    getBlanketTask() {
      this.taskFormService.getBlanketTask();
    }

  }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  template: 
  `
  <p>
    task works!
  </p>
  <button  type="submit" mat-button-raised color="accent" (click)="clearTodosForm()">Clear Form</button>
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
  `
  ,
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from './_service/task-form-service.service';
import { ApiService } from '../../config/api.service';
import { TaskGroupService } from './_service/task-group.service';

@Component({
  selector: 'app-task',
  template:
  `
      <h1>Create Task Group Blanket</h1>

    <!--Task Group Name: {{taskForm.controls.todos_group.value}}-->
    <br />
    <form [formGroup]="taskForm" >
      <!--<option [ngValue]="group" *ngFor="let group of groups">{{group.group_name}}</option>-->


      <mat-form-field class="form-element">
      <mat-select matInput  placeholder="Choose Group Set" #groupValue formControlName='todos_group'  (change)="changeGroup($event.value)">
        <mat-option *ngFor="let group of groups; let i=index" value={{group.id} (click)="sendOption(group)">
          <span class="mat-option-text">{{group.group_name}}</span>
        </mat-option>
      </mat-select>
      </mat-form-field>
      <br />

      <br />

      <mat-form-field class="form-element">
        <input type="text"  placeholder="Choose Group Set "
                            aria-label="Number"
                            matInput [formControl]="todos_group"
                            [matAutocomplete]="auto"
                            formControlName='todos_group'
                            >
        <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let option of options" [value]="option.id" formControlName='todos_group'>
            {{option.set_names['id']}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>

      <div *ngFor="let group of groups">
        {{group.set_names}}
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
    {{sets}}
    `
  ,
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

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
      this.tgs.getMessage().subscribe(rsp => {
        this.groups = rsp;
        for (let obj in rsp) {
        console.log('names'+ obj[0])
        }
      });
    }
  }

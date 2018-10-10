import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {ApiService} from '../../../../config/api.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Todo } from '../../_models/';
import {TodosForm} from '../../_models';


@Component({
  selector: 'app-todos',
  template:
  `
    <form [formGroup]="todosForm">
      <table>
        <tr>
          <td>
            <mat-form-field>
              <input matInput formControlName="todo" placeholder="Task Name">
            </mat-form-field>
          </td>
          <td>
            <mat-form-field>
              <textarea matInput formControlName="comment" placeholder="Comment"></textarea>
            </mat-form-field>
          </td>
          <td>
          <!--
            <mat-form-field>
              <input matInput formControlName="duedate" placeholder="Due Date">
            </mat-form-field>
          -->
            <mat-form-field class="example-full-width">
              <input matInput [matDatepicker]="picker" placeholder="Due Date"formControlName="duedate">
              <mat-datepicker-toggle matSuffix [for]="picker">
                <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
              </mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </td>
          <td>
          <mat-form-field class="form-element">
          <mat-select matInput  placeholder="Status" formControlName='status'>
            <mat-option *ngFor="let status of status; let i=index" value={{status}}>
              <span class="mat-option-text">{{status}}</span>
            </mat-option>
          </mat-select>
          </mat-form-field>
          </td>
          <td>
            <!-- emit delete event up w/ index of todos -->
            <button (click)="delete()">Delete</button>
          </td>
        </tr>
      </table>
      <pre>Todos Form Status: <span class="status">{{todosForm.status}}</span></pre>
    </form>
    <div *ngIf='todos'>
    {{todos}}
    </div>
    {{todos | json}}
    <mat-divider></mat-divider>
    `,
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

  status = ['na', 'started', 'complete']

  @Input() todosForm: FormGroup;
  @Input() index: number;
  @Input() selectedId: any;
  @Output() deleteTodos: EventEmitter<number> = new EventEmitter();

  todos: any;

    constructor(private api: ApiService,private fb: FormBuilder) { }

    ngOnInit() {

    }
    /*ngOnChanges() {
      this.todos;
    }*/

    delete() {
      this.deleteTodos.emit(this.index);
    }
}

      /*

showTodos() {
      let todos = this.todos;
      
      console.log(todos.length); // first fit shows lenght of 5. 
      for (let key in todos) {
        if (todos.hasOwnProperty(key)) {
          const currentTodo = this.todosForm.get('todos') as FormArray;
          currentTodo.push(
            this.fb.group(
              new TodosForm(new Todo(todos[key], ))
            )
          );
        }
      }


      const todos_group = res['todos_group'];
      this.taskForm.getValue().get('todos_group').setValue(todos_group);
      const todos = res['todos'];
      console.log(todos);
      for (const todo in todos) {
        if (todos.hasOwnProperty('field')) {
           console.log('field');
        } else {
        const todoslist =  todos[todo];
        const currentTask = this.taskForm.getValue();
        const currentTodos = currentTask.get('todos') as FormArray;
        currentTodos.push(
          this.fb.group(
            new TodosForm(new Todo(todoslist['todo'], ))
          )
        );
        this.taskForm.next(currentTask);
        console.log('field');
      }
    }
    });
  }*/
  }

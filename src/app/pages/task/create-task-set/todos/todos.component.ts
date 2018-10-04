import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
              <input matInput formControlName="comment" placeholder="Comment">
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
    <mat-divider></mat-divider>
    `,
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

  status = ['na', 'started', 'complete']

  @Input() todosForm: FormGroup;
  @Input() index: number;
  @Output() deleteTodos: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    delete() {
      this.deleteTodos.emit(this.index);
    }

  }

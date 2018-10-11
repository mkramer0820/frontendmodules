import { Component, OnInit,Input, Output, ChangeDetectionStrategy,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {ApiService} from '../../../../config/api.service';
import { OrderTaskTodo } from '../_models/';
import {OrderTaskTodosForm} from '../_models';

@Component({
  selector: 'app-order-todos',
  templateUrl: './order-todos.component.html',
  styleUrls: ['./order-todos.component.scss']
})
export class OrderTodosComponent implements OnInit {

  status = ['na', 'started', 'complete'];

  @Input() orderTaskTodoForm: FormGroup;
  @Input() index: number;
  @Input() selectedId: string;
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

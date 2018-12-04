import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {ApiService} from '../../../../config/api.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Todo } from '../../_models/';
import {TodosForm} from '../../_models';


@Component({
  selector: 'app-todos',
  templateUrl: 'todos.component.html',
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



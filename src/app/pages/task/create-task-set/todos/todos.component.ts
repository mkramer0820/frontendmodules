import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


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

    constructor() { }

    ngOnInit() {

    }

    delete() {
      this.deleteTodos.emit(this.index);
    }
}



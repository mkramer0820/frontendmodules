import { Component, OnInit,Input, Output, ChangeDetectionStrategy,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';


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
  // @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;


  todos: any;

    constructor() { }

    ngOnInit() {

    }
    /*ngOnChanges() {
      this.todos;
    }*/

    delete() {
      this.deleteTodos.emit(this.index);
    }

}

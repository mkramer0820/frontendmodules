import { FormControl, Validators } from '@angular/forms'
import { OrderTaskTodo } from './order-task-todo';

export class OrderTaskTodosForm {
  todo = new FormControl();
  duedate = new FormControl();
  comment = new FormControl();
  status = new FormControl();
  constructor(
    todo: OrderTaskTodo,
  ) {
    this.todo.setValue(todo.todo)
    this.todo.setValidators([Validators.required])

    this.comment.setValue(todo.comment);
    this.duedate.setValue(todo.duedate);
    this.duedate.setValue(todo.duedate);
    this.status.setValue(todo.duedate);
  }
}

import { FormControl, Validators } from '@angular/forms'
import { Todo } from './todos.model';

export class TodosForm {
  todo = new FormControl()
  duedate = new FormControl()
  comment = new FormControl()
  status = new FormControl()
  constructor(
    todo: Todo
  ) {
    this.todo.setValue(todo.todo)
    this.todo.setValidators([Validators.required])

    this.comment.setValue(todo.comment)
    this.duedate.setValue(todo.duedate)
    this.duedate.setValue(todo.duedate)
    this.status.setValue(todo.duedate)
  }
}

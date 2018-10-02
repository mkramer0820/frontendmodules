import { FormControl, Validators, FormArray } from '@angular/forms'
import { Task } from './task.model';

export class TaskForm {
  todos_group = new FormControl()
  todos = new FormArray([])

  constructor(task: Task) {
    if (task.todos_group) {
      this.todos_group.setValue(task.todos_group)
    }
    if (task.todos) {
      this.todos.setValue([task.todos])
    }
  }
}

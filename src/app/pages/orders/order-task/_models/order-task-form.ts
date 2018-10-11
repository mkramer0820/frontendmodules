import { FormControl, Validators, FormArray } from '@angular/forms';
import { OrderTask } from './order-task';

export class OrderTaskForm {

  todos_group = new FormControl();
  set_name = new FormControl();
  todos = new FormArray([]);

  constructor(task: OrderTask) {
    if (task.todos_group) {
      this.todos_group.setValue(task.todos_group);
    }
    if (task.set_name) {
      this.set_name.setValue(task.set_name);
    }
    if (task.todos) {
      this.todos.setValue([task.todos]);
    }
  }
}

import { FormControl, Validators, FormArray } from '@angular/forms';
import { OrderTask } from './order-task';

export class OrderTaskForm {

  order = new FormControl();
  todos_group = new FormControl();
  set_name = new FormControl();
  active = new FormControl();
  set_status = new FormControl();
  todos = new FormArray([]);

  constructor(task: OrderTask) {
    if (task.order) {
      this.order.setValue(task.order);
    }
    if (task.todos_group) {
      this.todos_group.setValue(task.todos_group);
    }
    if (task.set_name) {
      this.set_name.setValue(task.set_name);
    }
    if (task.active) {
      this.active.setValue(task.active);
    }
    if (task.set_status) {
      this.set_status.setValue(task.set_status);
    }
    if (task.todos) {
      this.todos.setValue([task.todos]);
    }
  }
}

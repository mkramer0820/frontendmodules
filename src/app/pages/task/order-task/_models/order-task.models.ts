import { FormControl, Validators, FormArray } from '@angular/forms';


export class OrderTaskForm {
  order = new FormControl();
  set_name = new FormControl();
  todos = new FormArray([]);

  constructor(orderTask: OrderTask) {
    if (orderTask.order) {
      this.order.setValue(orderTask.order);
    }
    if (orderTask.set_name) {
      this.set_name.setValue(orderTask.set_name);
    }
    if (orderTask.todos) {
      this.todos.setValue([orderTask.todos]);
    }
  }
}

export class OrderTask {
    order: string;
    todos: OrderTodo[];
    set_name: string;

    constructor(order: string, set_name?: string, todos?: OrderTodo[]) {
       this.order = order;
        this.set_name = set_name;
        this.todos = todos;
    }
}

////////////////////////////
//   Sub Todo            //
///////////////////////////

export class OrderTodosForm {
    todo = new FormControl();
    duedate = new FormControl();
    comment = new FormControl();
    status = new FormControl();
    constructor(
      todo: OrderTodo
    ) {
      this.todo.setValue(todo.todo);
      this.todo.setValidators([Validators.required]);
      this.comment.setValue(todo.comment);
      this.duedate.setValue(todo.duedate);
      this.duedate.setValue(todo.duedate);
      this.status.setValue(todo.duedate);
    }
  }

export class OrderTodo {
    todo: string;
    comment: string;
    duedate: string;
    status: string;


    constructor(todo?: string, comment?: string, duedate?: string, status?: string) {
        this.todo = todo;
        this.comment = comment;
        this.duedate = duedate;
        this.status = status;
    }
}


// MastTaskTemplate
interface RootObject {
  id: number;
  set_names: any[];
  group_name: string;
}



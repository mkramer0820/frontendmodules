export class TaskSet {
  id: number;
  group_name: string;
  set_name: string;
  todos: Todo[];
}

export class Todo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}


  
  export class OrderTaskGroup {
    id: number;
    group_name: string;
    set_name: string;
    todos: Todo[];
    todos_group: number;
  }
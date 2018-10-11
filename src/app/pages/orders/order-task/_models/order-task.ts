import { OrderTaskTodo } from './order-task-todo';

export class OrderTask {
    todos_group: string;
    set_name: string;
    id: number;
    todos: OrderTaskTodo[];

    constructor(todos_group: string, todos?: OrderTaskTodo[]) {
        this.todos_group = todos_group;
        this.todos = todos;
    }
}

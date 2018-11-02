import { OrderTaskTodo } from './order-task-todo';

export class OrderTask {

    order: number;
    todos_group: string;
    set_name: string;
    id: number;
    isActive: boolean;
    set_status: string;
    todos: OrderTaskTodo[];

    constructor(todos_group: string, todos?: OrderTaskTodo[], set_status?: string, isActive?: boolean) {
        this.todos_group = todos_group;
        this.set_status = set_status;
        this.isActive = isActive || true;
        this.todos = todos;
    }
}

import { Todo } from './todos.model';
import {SetName} from './set-name.model';

export class Task {
    todos_group: string;
    set_name: string;
    id: number;
    todos: Todo[];

    constructor(todos_group: string, todos?: Todo[]) {
        this.todos_group = todos_group;
        this.todos = todos;
    }
}

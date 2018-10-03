export class Todo {
    todo: string;
    comment: string;
    duedate: string;

    constructor(todo?: string, comment?: string, duedate?: string) {
        this.todo = todo;
        this.comment = comment;
        this.duedate = duedate;
    }
}

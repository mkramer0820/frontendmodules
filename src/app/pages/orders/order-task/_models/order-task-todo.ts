export class OrderTaskTodo {
    todo: string;
    comment: string;
    duedate: string;
    status: string;


    constructor(todo?: string, comment?: string, duedate?: string, status?: string) {
        this.todo = todo || "";
        this.comment = comment || "";
        this.duedate = duedate || "";
        this.status = status || "";
    }
}

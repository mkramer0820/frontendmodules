import {Moment} from 'moment'

export class DashBoardTask {
  public id: number;
  public buyer_style_number: string;
  public jp_style_number: string;
  public brand: string;
  public order_target_date: string;
  public set_name: string;
  public todos_group: string;
  public active: boolean;
  public todos: DashBoardTodo[];
  public order: number;
  public set_status?: string;

  constructor(
    id: number,
    buyer_style_number: string,
    jp_style_number: string,
    brand: string,
    order_target_date: string,
    set_name: string,
    todos_group: string,
    active: boolean,
    set_status: string,
    todos: DashBoardTodo[],
    order: number,
  ) { this.id = id; this.buyer_style_number = buyer_style_number; this.jp_style_number = jp_style_number;
      this.brand = brand; this.order_target_date = order_target_date; this.set_name = set_name; this.todos_group = todos_group;
      this.active = active; this.todos = todos; this.order = order; this.set_status = set_status; }

}

export class DashBoardTodo {
  public todo: string;
  public status: string;
  public comment: string;
  public duedate: Moment;

  constructor(
    todo: string,
    status: string,
    comment: string,
    duedate: Moment,
  ) {this.todo = todo; this.status = status; this.comment = comment; this.duedate = duedate; }

}

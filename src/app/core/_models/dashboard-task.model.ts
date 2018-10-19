export class DashBoardTask {
  id: number;
  buyer_style_number: string;
  jp_style_number: string;
  brand: string;
  order_target_date: string;
  set_name: string;
  todos_group: string;
  active: boolean;
  set_status?: string;
  todos: DashBoardTodo[];
  order: number;

  constructor(
    id: number,
    buyer_style_number: string,
    jp_style_number: string,
    brand: string,
    order_target_date: string,
    set_name: string,
    todos_group: string,
    active: boolean,
    set_status?: string,
    todos: DashBoardTodo[],
    order: number,
  ) { this.id = id; this.buyer_style_number = buyer_style_number;
    
  }

}

export class DashBoardTodo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}
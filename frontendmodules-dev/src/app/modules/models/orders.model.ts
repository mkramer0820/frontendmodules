export class Order {

  id: number;
  buyer: string;
  factory: string;
  buyer_name: string;
  factory_name: string;
  customer_order_number: string;
  buyer_style_number: string;
  jp_style_number: string;
  factory_ship_date: string;
  cost_from_factory: number;
  buyers_price: number;
  order_type: string;
  qty: number;
  sweater_image: string;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
  due_date: string;
  tasks: OrderTask[];
}



export class Orders {
  id: number;
  buyer: string;
  factory: string;
  buyer_name: string;
  factory_name: string;
  customer_order_number: string;
  buyer_style_number: string;
  jp_style_number: string;
  factory_ship_date: string;
  cost_from_factory: number;
  buyers_price: number;
  order_type: string;
  qty: number;
  sweater_image: string;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
  due_date: string;
  tasks: OrderTask[];

}

export class OrderTask {
  id: number;
  set_name: string;
  todos_group: string;
  todos: OrderTaskTodo[];
  order: number;
}

export class OrderTaskTodo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}
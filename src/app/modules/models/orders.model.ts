
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

  constructor(
    id: number,
    buyer?:  string,
    factory?:  string,
    buyer_name?:  string,
    factory_name?:  string,
    customer_order_number?:  string,
    buyer_style_number?:  string,
    jp_style_number?:  string,
    factory_ship_date?:  string,
    cost_from_factory?:  number,
    buyers_price?:  number,
    order_type?:  string,
    qty?:  number,
    sweater_image?:  string,
    sweater_description?:  string,
    brand?:  string,
    fiber_content?:  string,
    jp_care_instructions?:  string,
    color?:  string,
    due_date?:  string,
    tasks?:  OrderTask[],
  ) {
    this.id =  id,
    this.buyer =  buyer,
    this.factory =  factory,
    this.buyer_name =  buyer_name,
    this.factory_name =  factory_name,
    this.customer_order_number =  customer_order_number,
    this.buyer_style_number =  buyer_style_number,
    this.jp_style_number =  jp_style_number,
    this.factory_ship_date =  factory_ship_date,
    this.cost_from_factory =  cost_from_factory,
    this.buyers_price =  buyers_price,
    this.order_type =  order_type,
    this.qty =  qty,
    this.sweater_image =  sweater_image,
    this.sweater_description =  sweater_description,
    this.brand =  brand,
    this.fiber_content =  fiber_content,
    this.jp_care_instructions =  jp_care_instructions,
    this.color =  color,
    this.due_date =  due_date,
    this.tasks =  tasks }
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
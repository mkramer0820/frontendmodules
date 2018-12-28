export interface OrderDetail {
  id: number;
  buyer: number;
  factory: number;
  buyer_name: string;
  factory_name: string;
  tasks: Task[];
  due_date: string;
  factory_ship_date: string;
  sweater_image: string;
  size: number;
  sizing: Sizing;
  factory_set: Factoryset;
  customer_set: Customerset;
  orderExpense: any[];
  completeTasks: Task[];
  incompleteTasks: Task[];
  isActive: boolean;
  customer_order_number: number;
  buyer_style_number: string;
  jp_style_number: string;
  cost_from_factory: number;
  buyers_price: number;
  order_type: string;
  qty: number;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
}

export interface Customerset {
  cust_id: number;
  cust_isActive: boolean;
  cust_name: string;
  cust_address1: string;
  cust_address2: string;
  cust_address3: string;
  cust_city: string;
  cust_state: string;
  cust_zipcode: string;
  cust_country: string;
  cust_email: string;
  cust_phone: string;
  cust_extension: string;
  cust_website: string;
  cust_description: string;
  cust_createdOn: string;
}

export interface Factoryset {
  factory_id: number;
  factory_isActive: boolean;
  factory_name: string;
  factory_contact_name_id: number;
  factory_address1: string;
  factory_address2: string;
  factory_address3: string;
  factory_city: string;
  factory_state: string;
  factory_zipcode: string;
  factory_country: string;
  factory_email: string;
  factory_phone: string;
  factory_website: string;
  factory_description: string;
  factory_createdOn: string;
}

export interface Sizing {
  sizing_id: number;
  sizing_size_type: string;
  sizing_size_detail: string;
}

export interface Task {
  id: number;
  buyer_style_number: string;
  jp_style_number: string;
  order_due_date: string;
  buyer: string;
  isActive: boolean;
  set_name: string;
  todos_group: string;
  set_status: string;
  todos: Todo[];
  order: number;
}

export interface Todo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}
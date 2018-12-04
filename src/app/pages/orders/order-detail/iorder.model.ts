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
  sizing: Sizing[];
  factory_set: Factoryset[];
  customer_set: Customerset[];
  orderExpense: any[];
  completeTasks: Task[];
  incompleteTasks: any[];
  isActive: boolean;
  customer_order_number: number;
  buyer_style_number: string;
  jp_style_number: string;
  cost_from_factory?: any;
  buyers_price?: any;
  order_type?: any;
  qty?: any;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
  jp_style_number_test: any[];
}

export interface Customerset {
  id: number;
  isActive: boolean;
  name: string;
  address1?: any;
  address2?: any;
  address3?: any;
  city?: any;
  state?: any;
  zipcode?: any;
  country?: any;
  email?: any;
  phone?: any;
  extension?: any;
  website?: any;
  description: string;
  createdOn: string;
}

export interface Factoryset {
  id: number;
  isActive: boolean;
  name: string;
  contact_name_id: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  createdOn: string;
}

export interface Sizing {
  id: number;
  size_type: string;
  size_detail: string;
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
export interface Iorder {
  id: number;
  buyer?: number;
  factory?: number;
  buyer_name?: string;
  factory_name?: string;
  tasks: Task[];
  due_date?: string;
  factory_ship_date?: string;
  sweater_image?: string;
  size?: number;
  sizing: Sizing[];
  factory_set: Factoryset[] | string;
  customer_set: Customerset[] | string;
  orderExpense: OrderExpense[];
  completeTasks: Task[];
  incompleteTasks: Task[];
  isActive: boolean;
  customer_order_number?: number;
  buyer_style_number: string;
  jp_style_number: string;
  cost_from_factory?: number;
  buyers_price?: number;
  order_type?: string;
  qty?: number;
  sweater_description?: string;
  brand?: string;
  fiber_content?: string;
  jp_care_instructions: string;
  color: string;
  jp_style_number_test: any[];
}

interface OrderExpense {
  id: number;
  totalExpense: number;
  expenseItems: ExpenseItem[];
  order?: any;
}

interface ExpenseItem {
  expenseItemCost: number;
  expenseItemName: string;
  expenseItemTotal: number;
}

interface Customerset {
  id: number;
  isActive: boolean;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  phone: string;
  extension: string;
  website: string;
  description: string;
  createdOn: string;
}

interface Factoryset {
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

interface Sizing {
  id: number;
  size_type: string;
  size_detail: string;
}

interface Task {
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

interface Todo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
}
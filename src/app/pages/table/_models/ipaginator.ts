export interface Ipaginator {
  next: string;
  previous?: any;
  count: number;
  total_pages: number;
  angular_current_page: number;
  page: number;
  results: Result[];
}

export interface Result {
  id: number;
  buyer: number;
  factory?: number;
  buyer_name: string;
  tasks: any[];
  due_date?: string;
  factory_ship_date?: string;
  sweater_image?: any;
  size?: any;
  sizing: any[];
  factory_set: Factoryset[] | string;
  customer_set: Customerset[];
  orderExpense: any[];
  completeTasks: any[];
  incompleteTasks: any[];
  isActive: boolean;
  customer_order_number: number;
  buyer_style_number: string;
  jp_style_number: string;
  cost_from_factory?: number;
  buyers_price?: number;
  order_type?: string;
  qty?: number;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
  factory_name?: string;
}

export interface Customerset {
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
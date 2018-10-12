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
  cost_from_factory: string;
  buyers_price: string;
  order_type: string;
  qty: string;
  sweater_image: string;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
  due_date: string;
}



export interface Orders {
  id: number;
  buyer: string;
  factory: string;
  buyer_name: string;
  factory_name: string;
  customer_order_number: string;
  buyer_style_number: string;
  jp_style_number: string;
  factory_ship_date: string;
  cost_from_factory: string;
  buyers_price: string;
  order_type: string;
  qty: string;
  sweater_image: string;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
  due_date: string;
}

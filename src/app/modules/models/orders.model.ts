export class Order {
  constructor(
    public id: number,
    public buyer: string,
    public factory: string,
    public buyer_name: string,
    public factory_name: string,
    public customer_order_number: string,
    public buyer_style_number: string,
    public jp_style_number: string,
    public factory_ship_date: string,
    public cost_from_factory: string,
    public buyers_price: string,
    public order_type: string,
    public qty: string,
    public sweater_image: string,
    public sweater_description: string,
    public brand: string,
    public fiber_content: string,
    public jp_care_instructions: string,
    public color: string,
    public due_date: string,) {}
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

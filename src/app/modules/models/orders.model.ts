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
    public color: string,) {}
}

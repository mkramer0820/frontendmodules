export class Order {
  constructor(
    public id: number,
    public buyer: string,
    public buyer_style_number: string,
    public jp_style_number: string,
    public factory: string,
    public cost_from_factory: string,
    public buyer_price: string,
    public order_type: string,
    public qty: string,
    public sweater_description: string,
    public fiber_content: string,
    public jp_care_instructions: string,
    public color: string, ) {}
}

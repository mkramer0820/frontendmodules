import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Order} from '../../../modules/models/orders.model';
import { Url } from 'url';
export interface DialogData {
  data: any;
}
export interface Tile {
  cols?: number;
  rows?: number;
  text?: string;
  color?: string;
  texts?: string[];
  img?: Url;
  address?: String[];
}

export interface OrderAddress{
  customAddress?: Address[];
  factoryAddress?: Address[];

}

export interface Address {
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  email?: string;
  phone?: string;
  extension?: string;
  website?: string;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetail: any;

  tiles: Tile[] = [
    {text: 'Two', cols: 1, rows: 2, img: this.order['order']['sweater_image']},
    {texts: ['Fiber Content: ' + this.order['order']['fiber_content'],
            'Descrption: ' + this.order['order']['sweater_description'],
            'Care Instructions: ' + this.order['order']['jp_care_instructions']
            ],
             cols: 3 , rows: 2},
  ];

  orderAddress: OrderAddress[] = [
  ]

  jpCost?: number;
  buyerCost?: number;
  profit?: number;
  

  constructor( @Inject(MAT_DIALOG_DATA) public order: DialogData ) { this.orderDetail = order['order']; }

  ngOnInit(
  ) { this.calculateCosts(this.orderDetail) }

  calculateCosts(order) {
    console.log(order, 'usede for calc')
    this.jpCost = order['qty'] * order['cost_from_factory'];
    this.buyerCost = order['qty'] * order['buyers_price'];
    this.profit = this.buyerCost - this.jpCost;
    console.log('totals', this.jpCost)
    }

}

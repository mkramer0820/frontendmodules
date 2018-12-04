import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {Order} from '../../../modules/models/orders.model';
import { Url } from 'url';
import {HttpClientService} from 'app/_services/http-client.service';
import { AppConfig } from 'app/config/app.config';
import {OrderDetail, Customerset, Factoryset, Task, Todo } from './iorder.model';
import {Observable, pipe} from 'rxjs';
import {filter, map} from 'rxjs/operators';

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
  httpOrder: Order
  buyer: string;

  tiles: Tile[] = [
    {text: 'Two', cols: 1, rows: 2, img: this.order['order']['sweater_image']},
    {texts: ['Fiber Content: ' + this.order['order']['fiber_content'],
            'Descrption: ' + this.order['order']['sweater_description'],
            'Care Instructions: ' + this.order['order']['jp_care_instructions']
            ],
             cols: 3 , rows: 2},
  ];

  orderAddress: OrderAddress[] = []

  jpCost?: number;
  buyerCost?: number;
  profit?: number;
  dialogConfig: MatDialogConfig;

  constructor(
    private httpClient: HttpClientService,
    @Inject(MAT_DIALOG_DATA) public order: DialogData,
    public dialogRef: MatDialogRef<OrderDetailComponent>  ) { 
      this.orderDetail = order['order'];
      console.log(this.orderDetail)
      this.getOrder(order)}

    ngOnInit(
      ) {  this.getOrderDetail();
        this.calculateCosts(this.orderDetail);
         console.dir(`Dialog config: ${this.dialogConfig}`); }
    
      calculateCosts(order) {
        console.log(order, 'usede for calc')
        this.jpCost = order['qty'] * order['cost_from_factory'];
        this.buyerCost = order['qty'] * order['buyers_price'];
        this.profit = this.buyerCost - this.jpCost;
        console.log('totals', this.jpCost)
        }
      
      updateSize() {
        this.dialogRef.updateSize('80%', '80%')
        //this.dialogRef._containerInstance._config.position = {top: '0px', left:'px'}
      }
      getOrder(order?) {
        if (order) {
          this.orderDetail = order['order'];
        } else {
          console.log('getting order detail')
          this.orderDetail = this.getOrderDetail();
        }
     
      }
      getOrderDetail() {
        const id = this.orderDetail['id'] + '/';
        console.log(AppConfig.urlOptions.orders + id +'/')
        this.httpClient.get(AppConfig.urlOptions.orders + id)
        .pipe(map((order: Order) => {
          return order
        }))
        .subscribe(res => {
           this.httpOrder = res
        })      
      }
    
    }
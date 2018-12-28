import { Component, OnInit, Inject, Optional } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialogModule} from '@angular/material';
import {Order} from '../../../modules/models/orders.model';
import { Url } from 'url';
import {HttpClientService} from 'app/_services/http-client.service';
import { AppConfig } from 'app/config/app.config';
import {OrderDetail, Customerset, Factoryset, Task, Todo, Sizing } from './iorder.model';
import {Observable, pipe} from 'rxjs';
import {filter, map, flatMap} from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

export interface DialogData {
  data: any;
}
export interface Tile {
  cols?: number;
  rows?: number;
  text?: string;
  color?: string;
  texts?: any[];
  img?: string;
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
  styleUrls: ['./order-detail.component.scss'],
  providers: [],
})
export class OrderDetailComponent implements OnInit {
  orderDetail: any;
  httpOrder: Order
  buyer: string;
  isDialog: boolean = true;
  tiles: Tile[]

  orderAddress: OrderAddress[] = []

  jpCost?: number;
  buyerCost?: number;
  profit?: number;
  dialogConfig: MatDialogConfig;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    @Optional() @Inject(MAT_DIALOG_DATA) private order?: DialogData,
    @Optional() public dialogRef?: MatDialogRef<OrderDetailComponent>,
     ) { 
      const id = +this.route.snapshot.params["id"];
      if (this.order) {
        this.isDialog = true;
        this.orderDetail = order['order'];
        console.log("got orderDeatil from dialog inject")
      }
      this.getOrder(id || null)}

    ngOnInit(
      ) {}
    
      calculateCosts(order) {
        console.log(order, 'usede for calc')
        this.jpCost = order['qty'] * order['cost_from_factory'];
        this.buyerCost = order['qty'] * order['buyers_price'];
        this.profit = this.buyerCost - this.jpCost;
        }
      
      updateSize() {
         this.dialogRef.updateSize('80%', '80%')
         this.dialogRef._containerInstance._config.position = {top: '0px', left:'px'}
      }
      getOrder(id) {
        if (id) {

          this.orderDetail = this.getOrderDetail(id);
         } else {this.orderDetail = 'No Info'}
      }
      getOrderDetail(id) {
        this.httpClient.get(AppConfig.urlOptions.orders + id + '/')
        .pipe(map((order: OrderDetail) => {
          let sizing_detail = Object.values(order.sizing).map((size: Sizing)  => size.sizing_size_detail );
          let sizing_type = Object.values(order.sizing).map((size: Sizing)  => size.sizing_size_type );
          let orderProp  = {order, sizing_detail, sizing_type}
          return orderProp
        }))
        .subscribe(res => {
          console.log(res)
          this.orderDetail = res.order;
          this.calculateCosts(res.order);
          let Tile: Tile[] = [ 
            {text: 'Two', cols: 1, rows: 2, img: res.order.sweater_image},
            {texts: ['Size: ' + res.order.sizing.sizing_size_detail + " -- " + res.order.sizing.sizing_size_type,
                    'Fiber Content: ' + res.order['fiber_content'],
                    'Descrption: ' + res.order['sweater_description'],
                    'Care Instructions: ' + res.order['jp_care_instructions']
                    ],
                     cols: 3 , rows: 2},
                  ];
            console.log(Tile);
            this.tiles = Tile
            return Tile
        })      
      }
    
    }
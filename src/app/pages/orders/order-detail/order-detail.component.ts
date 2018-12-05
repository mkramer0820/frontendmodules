import { Component, OnInit, Inject, Optional } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialogModule} from '@angular/material';
import {Order} from '../../../modules/models/orders.model';
import { Url } from 'url';
import {HttpClientService} from 'app/_services/http-client.service';
import { AppConfig } from 'app/config/app.config';
import {OrderDetail, Customerset, Factoryset, Task, Todo } from './iorder.model';
import {Observable, pipe} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

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
      this.getOrder({orderD: null , id: id|| null})}

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
      getOrder({orderD, id}) {
        /*if (orderD) {
          console.log(orderD)
          this.orderDetail = orderD['order'];
          let Tile: Tile[] = [ 
            {text: 'Two', cols: 1, rows: 2, img: this.orderDetail['sweater_image']},
            {texts: ['Fiber Content: ' + this.orderDetail['fiber_content'],
                    'Descrption: ' + this.orderDetail['sweater_description'],
                    'Care Instructions: ' + this.orderDetail['jp_care_instructions']
                    ],
                     cols: 3 , rows: 2},
                  ]
            return Tile
        }*/
        if (id) {

          this.orderDetail = this.getOrderDetail(id);
         }
      }
      getOrderDetail(id) {
        this.httpClient.get(AppConfig.urlOptions.orders + id + '/')
        .pipe(map((order: OrderDetail) => {
          return order
        }))
        .subscribe(res => {
          this.orderDetail = res;
          this.calculateCosts(res);
          let Tile: Tile[] = [ 
            {text: 'Two', cols: 1, rows: 2, img: res['sweater_image']},
            {texts: ['Fiber Content: ' + res['fiber_content'],
                    'Descrption: ' + res['sweater_description'],
                    'Care Instructions: ' + res['jp_care_instructions']
                    ],
                     cols: 3 , rows: 2},
                  ];
            console.log(Tile);
            this.tiles = Tile
            return Tile
        })      
      }
    
    }
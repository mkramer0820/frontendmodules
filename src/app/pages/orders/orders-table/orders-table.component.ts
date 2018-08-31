import { Component, OnInit} from '@angular/core';
//COLimport {MatDialog} from '@angular/material';
import {Order} from '../../../modules/models/orders.model';
import {ApiService} from '../../../config/api.service';
// import {OrdersAddComponent} from '../orders-add/orders-add.component';
// import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
//import {SharedService} from '../shared.service';
import {Subscription} from 'rxjs';
//import {Observable} from 'rxjs';
import {Factory} from '../../../modules/models/factory.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  orders: Order[];
  displayColumns: string [] = [
   'ID', 'BUYER','FACTORY',  'ORDER NUMBER', 'BUYER STYLE #', 'JP STYLE #',
   'FACTORY SHIP DT', 'COST FROM FACTORY', 'BUYER PRICE',
    'ORDER TYPE', 'QTY', 'SWEATER IMG', 'SWEATER DESCRIPTION',
    'BRAND', 'FIBER CONTENT', 'COLOR'
  ]
  message: any;
  subscription: Subscription;
  factory: Factory[];
  f = [];

  constructor(
    private apiService: ApiService,
    //private dialog: MatDialog,
    //private service: SharedService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      console.log(orders);
      //loop through orders to get id of factory
      for (let order of this.orders) {
        //get the factory details
        this.apiService.getFactoryDetails(order['factory']).subscribe((factory: Array<Factory>) => {
          this.f.push(factory);
          this.factory = this.f;
          console.log(this.factory)
        })
      }
    });
  }
}

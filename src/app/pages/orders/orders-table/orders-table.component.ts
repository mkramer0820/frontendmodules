import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Order} from '../../../modules/models/orders.model';
import {ApiService} from '../../../config/api.service';
// import {OrdersAddComponent} from '../orders-add/orders-add.component';
// import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
import {SharedService} from '../shared.service';
import {Subscription} from 'rxjs';
import {Customer} from '../../../modules/models/customer.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  orders: Order[];
  displayColumns: string [] = [
   'ID', 'BUYER', 'BUYER STYLE #', 'JP STYLE #',
   'FACTORY', 'COST FROM FACTORY', 'BUYER PRICE',
    'ORDER TYPE', 'QTY', 'SWEATER IMG', 'SWEATER DESCRIPTION',
    'FIBER CONTENT', 'JP CARE INSTRUCTIONS', 'COLOR'
  ]
  message: any;
  subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private service: SharedService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
    });
  }
}

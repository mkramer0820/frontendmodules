import { Component, OnInit, Directive, ViewChild, Input} from '@angular/core';
import {Order, Orders} from '../../../modules/models/orders.model';
import {ApiService} from '../../../config/api.service';
// import {OrdersAddComponent} from '../orders-add/orders-add.component';
// import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
import {OrdersSharedService} from '../orders-shared.service';
import {Subscription} from 'rxjs';
//import {Observable} from 'rxjs';
import {Factory} from '../../../modules/models/factory.model';
import {Customer} from '../../../modules/models/customer.model';
import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
import {MatDialog, MatTableDataSource, MatPaginator, MatSortModule, MatSort } from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  providers: []
})
export class OrdersTableComponent implements OnInit {
  orders: Order[];
  displayColumns: string [] = [
   'ID', 'BUYER','FACTORY', 'ORDER NUMBER', 'BUYER STYLE #', 'JP STYLE #',
   'FACTORY SHIP DT', 'COST FROM FACTORY', 'BUYER PRICE',
    'ORDER TYPE', 'QTY', 'SWEATER IMG', 'SWEATER DESCRIPTION',
    'BRAND', 'FIBER CONTENT', 'COLOR', 'UPDATE'
  ]
  message: string;
  factoryMessage: Factory[];
  buyerMessage: Customer[];
  subscription: Subscription;
  factory: Factory[];
  f = [];
  test: any;

 //myorders= [];

 //dataSource = new MatTableDataSource(this.myorders);

  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private apiService: ApiService,
    private shared: OrdersSharedService,
    private dialog: MatDialog,
    //private service: SharedService,
  ) { }

  ngOnInit() {
    this.getOrders();

  }

  sendMessage(message): void {
          // send message to subscribers via observable subject
          this.shared.sendMessage(message);
    }
  clearMessage(): void {
    this.shared.clearMessage();
  }


  getOrders() {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      console.log(orders)
    });
  }

  openUpdateDialog(id): void {
    const dialogRef = this.dialog.open(OrdersUpdateComponent, {
      width: '700px',
    });
    this.apiService.getOrdersDetails(id).subscribe(message =>{
      this.sendMessage(message);
    });
    dialogRef.afterOpen().subscribe(result => {
      console.log(`Dailog result: ${result}`)
      this.shared.getMessage().subscribe((response: any) => {
        this.message = response;
      });
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.apiService.getOrders().subscribe((orders: Array<Order>) => {
        this.orders = orders;
        return dialogRef.close()
        //console.log(customers);
      });
    });
  }
}

export class OrdersDataSource extends DataSource<any> {
  constructor(private apiService: ApiService) {
    super();
  }
  connect(): Observable<Orders[]> {
    return this.apiService.getMyOrders();
  }
  disconnect() {}
}

import { Component, OnInit, Directive,AfterViewInit,  ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Order, Orders, OrderTask} from '../../../modules/models/orders.model';
import {ApiService} from '../../../config/api.service';
// import {OrdersAddComponent} from '../orders-add/orders-add.component';
// import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
import {OrdersSharedService} from '../orders-shared.service';
import {Subscription, of, merge, pipe} from 'rxjs';
import {map, filter, catchError, finalize, tap} from 'rxjs/operators';
import {Factory} from '../../../modules/models/factory.model';
import {Customer} from '../../../modules/models/customer.model';
import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
import {MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator, MatSortModule, MatSort, MatTab } from '@angular/material';
import {DataSource, CollectionViewer} from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../_services';
import {TaskComponent} from '../../task/task.component';
import { TaskSetComponent } from '../../task/create-task-set/task-set.component';
import {ModalService} from '../../_services/modal.service';
import {TaskGroupService} from '../../task/_service/task-group.service';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {OrderService} from './_service/order.service';
import {FormControl} from '@angular/forms';
// import { DatePipe } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},]
})
export class OrdersTableComponent implements OnInit, AfterViewInit {
  orders: Order[];
  //dataSource = new MatTableDataSource();
  displayColumns: string [] = [
   'ID', 'DUE DATE', 'BUYER', 'FACTORY', 'ORDER NUMBER', 'BUYER STYLE #', 'JP STYLE #',
   'FACTORY SHIP DT', 'COST FROM FACTORY', 'BUYER PRICE',
    'ORDER TYPE', 'QTY', 'SWEATER IMG', 'SWEATER DESCRIPTION',
    'BRAND', 'FIBER CONTENT', 'COLOR', 'UPDATE', 'TASKS', 'TOTAL TASK SETS'  ]
  
  tododisplayColumns: string [] = ['todo', 'comment', 'duedate', 'status']

  ///////
  // shared message for order
  /////
  databaseId: string;
  orderTask: boolean = false;
  sentGroups: any;
  order: any;
  selectedTask: any;

  orderSort: any;
  sortVal: any;
  serializedDate = new FormControl(moment().format('YYYY-MM-DD'));
  serializedDate2 = new FormControl((new Date()).toISOString());


  uniqueCustomerFilter: Array<any>;
  message: string;
  factoryMessage: Factory[];
  buyerMessage: Customer[];
  subscription: Subscription;
  factory: Factory[];
  f = [];
  test: any;
  token = localStorage.getItem('currentUser');
  myorders= [];

  dataSource = new MatTableDataSource(this.myorders);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public firstDate = moment();
  public secondDate = moment();

  constructor(
    private apiService: ApiService,
    private shared: OrdersSharedService,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private modalService: ModalService,
    private tgs: TaskGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrderService,
    //private service: SharedService,
  ) { }

  ngOnInit() {
    this.getOrders('id');
    this.tgs.getTaskGroups();

  }
  ngAfterViewInit() {
    this.getOrders('id');
  }
  onRowClicked(row) {
    this.order = row;
    this.selectedTask = row.tasks;
    console.log('Row clicked: ', row);
  }
  sendMessage(message): void {
          // send message to subscribers via observable subject
          this.shared.sendMessage(message);
    }
  clearMessage(): void {
    this.shared.clearMessage();
  }
  decodeJwt(){
    this.auth.updateData(this.token);
  }
  getTaskGroup() {
    this.tgs.getMessage().subscribe(rsp => {
      this.sentGroups = rsp;
    });
  }
  
//   good but testing orderservice
 getOrders(id) {
  this.apiService.getOrders(id).subscribe((orders: Array<Order>) => {
    this.orders = orders;
    this.dataSource = new MatTableDataSource(orders);
    this.uniqueCustomerFilter = orders;
    this.getUniqueCustomers(orders);
    return this.orderSort = '-', this.orders;
  });
 }

  getSortOrders(val) {
    this.sortVal = val;
    if (this.orderSort === '-') {

      this.apiService.getOrders(this.orderSort + val).subscribe((orders: Array<Order>) => {
        this.orders = orders;
        // console.log(Object.keys(orders));
        this.dataSource = new MatTableDataSource(orders);
        this.orderSort = '';
      // console.log(orders)
      });
    } else {
      this.apiService.getOrders(val).subscribe((orders: Array<Order>) => {
        this.orders = orders;
        console.log(orders);
        this.dataSource = new MatTableDataSource(orders);
        this.orderSort = '-';
      });
    }
  } 
////////////////////////////////////////////////////////////////
///         MODAL                                           ///
//////////////////////////////////////////////////////////////
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
  openModal(id: string, order?, tasks?) {
    //this.orderTask = false;
    //this.databaseId = databaseId;
    this.order = order;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    
    this.modalService.close(id);
  }

/////////////////////////////////////////////////////////////////
//            FILTERS                                         //
///////////////////////////////////////////////////////////////

  getUniqueCustomers(orders) {
    let order = orders;

    let customers = [];

    for (let order in orders) {
      if (orders[order].hasOwnProperty('buyer_name')) {
        customers.push(orders[order]['buyer_name'])
      } else { console.log('ooops')}
    }
    let uniqueCustomers = Array.from(new Set(customers));
    return this.uniqueCustomerFilter = uniqueCustomers;
  }
  testOrderService(buyer: string, dueDateBefore: string, dueDateAfter: string, ordering: string) {
   
    this.ordersService.findOrders(buyer, dueDateBefore, dueDateAfter, ordering).pipe(
      catchError(() => of([])),
    )
    .subscribe((orders: Orders[]) => {

      console.log(orders)
      this.orders = orders;
    });
  }
}



export class OrdersDataSource implements DataSource<Order> {

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();


  constructor(private ordersService: OrderService) {}

  connect(collectionViewer: CollectionViewer): Observable<Order[]> {
    return this.ordersSubject.asObservable();

  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.ordersSubject.complete();
    this.loadingSubject.complete();
  }

  loadOrders(buyer: string, dueDateBefore: string, dueDateAfter: string, ordering: string) {
    this.loadingSubject.next(true);
    this.ordersService.findOrders(buyer, dueDateBefore, dueDateAfter, ordering).pipe(
              catchError(() => of([])),
              finalize(() => this.loadingSubject.next(false))
    )
    // .subscribe(orders => this.ordersSubject.next(orders));
    // console.log("orders subject", this.ordersSubject);
  }
  
}

/*
{
  params: new HttpParams()
      .set('ordering', ordering.toString())
      .set('page', page.toString())
      .set('page_size', page_size.toString())
}).pipe(
  map(res =>  res['results'])
);
}
*/
function mapOrder (array, order, key) {
  
  array.sort( function (a, b) {
    var A = a[key], B = b[key];
    
    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
    
  });
  
  return array;
};

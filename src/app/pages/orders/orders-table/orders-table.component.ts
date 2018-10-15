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



@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  providers: []
})
export class OrdersTableComponent implements OnInit, AfterViewInit {
  orders: Order[];
  //dataSource = new MatTableDataSource();
  displayColumns: string [] = [
   'ID', 'DUE DATE', 'BUYER', 'FACTORY', 'ORDER NUMBER', 'BUYER STYLE #', 'JP STYLE #',
   'FACTORY SHIP DT', 'COST FROM FACTORY', 'BUYER PRICE',
    'ORDER TYPE', 'QTY', 'SWEATER IMG', 'SWEATER DESCRIPTION',
    'BRAND', 'FIBER CONTENT', 'COLOR', 'UPDATE', 'TASKS', 'TOTAL TASK SETS'  ]

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
    return this.orderSort = '-';
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
  openDialog() {

    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position.top = '0';
    dialogConfig.position.left = '0';
  
    this.dialog.open(TaskSetComponent, dialogConfig);
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

  loadOrders(ordering: string, page: number, page_size: number) {
    this.loadingSubject.next(true);

    this.ordersService.findOrders(ordering, page, page_size).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(orders => this.ordersSubject.next(orders));
    console.log("orders subject", this.ordersSubject);
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

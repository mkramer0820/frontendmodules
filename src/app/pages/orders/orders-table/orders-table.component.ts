import { Component, OnInit, AfterViewInit,  ViewChild, Input} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Order} from '../../../modules/models/orders.model';
import {AppConfig} from '../../../config/app.config';
import {ApiService} from '../../../config/api.service';
import {OrdersSharedService} from '../orders-shared.service';
import {Subscription, of, } from 'rxjs';
import { catchError} from 'rxjs/operators';
import {Factory} from '../../../modules/models/factory.model';
import {Customer} from '../../../modules/models/customer.model';
import {MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthenticationService } from '../../_services';
import {ModalService} from '../../_services/modal.service';
import {TaskGroupService} from '../../task/_service/task-group.service';
import {ActivatedRoute, Router, ChildActivationEnd} from '@angular/router';
import {OrderService} from './_service/order.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {DynamicFormRequestComponent} from '../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import {OrderTaskComponent} from '../order-task/order-task.component';
import {OrderDetailComponent} from '../order-detail/order-detail.component';
import {FilterFormComponent} from '../../../forms/dynamic-form/filter-form/filter-form.component';

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
    'ORDER TYPE', 'QTY', 'SWEATER IMG', 'BRAND', 'SWEATER DESCRIPTION',
    'FIBER CONTENT', 'COLOR', 'UPDATE', 'TASKS'];
  
  tododisplayColumns: string [] = ['todo', 'comment', 'duedate', 'status']

  ///////
  // shared message for order
  /////
  orderTask: boolean = false;
  sentGroups: any;
  order: any;
  selectedTask: any; // used for sending to modal

  //////filter pannel
  selected: string;
  panelOpenState: boolean;
  urlset = AppConfig.urlOptions.orders;
  opt: any[];
  //filterForm: FormGroup;
  

  /////////////
  orderSort: string;
  sortVal: any;
  serializedDate = new FormControl(moment().format('YYYY-MM-DD'));
  totalCost: any = {};
  selectedRowIndex: number = -1;

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
  cred: any;

  dataSource = new MatTableDataSource(this.myorders);
  @ViewChild(FilterFormComponent) filter;
  tableFilter: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() cards: boolean = true;


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
  ) { /*this.filterForm = new FormGroup({buyerStyle: new FormControl(), jpSytle: new FormControl(), selected: new FormControl(), firstDate: new FormControl(), secondDate: new FormControl()})*/ }

  ngOnInit() {
    this.getOrders('id');
    this.tgs.getTaskGroups();

  }
  ngAfterViewInit() {
    this.getOrders('id');
    //this.tableFilter = this.filter.filters;
    this.options(this.orders)
  }
  onRowClicked(row) {
    this.order = row;
    this.selectedTask = row.tasks;

    console.log('Row clicked: ', row);
  }
  options(orders: Order[]) {
    for (let order of orders) {
      this.opt.push(order.buyer_name)
      console.log(order);
    }
  }
  onRowHighlight(row){
    this.selectedRowIndex = row.id;
  }
  sendMessage(message): void {
          // send message to subscribers via observable subject
          this.shared.sendMessage(message);
    }
  clearMessage(): void {
    this.shared.clearMessage();
  }
  getTaskGroup() {
    this.tgs.getMessage().subscribe(rsp => {
      this.sentGroups = rsp;
    });
  }
  

/////////////////////////////////////////////////
//          GET ORDERS                        //
///////////////////////////////////////////////

//   good but testing orderservice
 getOrders(id) {
  this.apiService.getOrders(id).subscribe((orders: Array<Order>) => {
    console.log(this.apiService.getOrders)
    this.orders = orders;
    this.getTotalCost(orders);
    // this.dataSource = new MatTableDataSource(orders);
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
  getTotalCost(order) {
    this.totalCost['jpCost'] = order.map(t => t.qty * t.cost_from_factory).reduce((acc, value) => acc + value, 0);
    this.totalCost['buyerCost'] = order.map(t => t.qty * t.buyers_price).reduce((acc, value) => acc + value, 0);
    this.totalCost['simpleProfit'] = this.totalCost.buyerCost  - this.totalCost.jpCost;
    console.log(this.totalCost);
    return this.totalCost;
  }
////////////////////////////////////////////////////////////////
///         MODAL                 Tasks                    ///
//////////////////////////////////////////////////////////////
  openAddTask(data): void {
    const dialogRef = this.dialog.open(OrderTaskComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.orderTasks, order: data, update: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.getOrders().subscribe((orders: Array<Order>) => {
        this.orders = orders;
        return dialogRef.close()
      });
    });
  }
  openUpdateTask(order): void {
    const dialogRef = this.dialog.open(OrderTaskComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.orderTasks, order: order, formData: order.tasks, update: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.getOrders().subscribe((orders: Array<Order>) => {
        this.orders = orders;
        return dialogRef.close()
        //console.log(customers);
      });
    });
  }

////////////////////////////////////////////////////////////////
///         MODAL                 Orders                    ///
//////////////////////////////////////////////////////////////
openAddDialog(): void {
  const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
    width: '700px',
    height: '800px',
    data: {url: AppConfig.urlOptions.orders, order: this.order, update: false}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      return dialogRef.close()
      //console.log(customers);
    });
  });
}
openUpdateDialog(order): void {
  const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
    width: '700px',
    height: '800px',
    data: {url: AppConfig.urlOptions.orders, formData: order, update: true}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      return dialogRef.close()
      //console.log(customers);
    });
  });
}
openDetailDialog(order): void {
  const dialogRef = this.dialog.open(OrderDetailComponent, {
    data: {order: order}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      return dialogRef.close()
      //console.log(customers);
    });
  });
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
  testOrderService(buyer?: string, dueDateBefore?: Date, dueDateAfter?: Date, ordering?: string, buyerStyle?: string, jpStyle?: string) {
    if (this.orderSort === '-') {
      let order = this.orderSort + ordering;
      this.orderSort=''

      this.ordersService.findOrders(buyer, dueDateBefore, dueDateAfter, order, buyerStyle, jpStyle).pipe(
        catchError(() => of([])),
      )
      .subscribe((orders: Order[]) => {
  
        console.log(orders)
        this.orders = orders;
        this.getTotalCost(orders);
      });
    } else if (this.orderSort === '') {
      let order = ordering
      this.ordersService.findOrders(buyer, dueDateBefore, dueDateAfter, order, buyerStyle, jpStyle).pipe(
        catchError(() => of([])),
      )
      .subscribe((orders: Order[]) => {
  
        console.log(orders)
        this.orders = orders;
        this.getTotalCost(orders);
        this.orderSort='-'
      });
    }
  }
  
}

/*


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

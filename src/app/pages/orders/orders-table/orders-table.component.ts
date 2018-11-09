import { Component, OnInit, AfterViewInit,  ViewChild, Input} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, } from '@angular/forms';
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
  order: any; //used on row click
  selectedTask: any; // used for sending to modal

  //////filter pannel
  panelOpenState: boolean;
  urlset = AppConfig.urlOptions.orders;
  opt: any[];
  filterForm: FormGroup;
  filters:any;
  //filterForm: FormGroup;
  

  /////////////
  orderSort: string = 'id';
  orderSortCase: number;
  sortVal: any;
  serializedDate = new FormControl(moment().format('YYYY-MM-DD'));
  totalCost: any = {};
  selectedRowIndex: number = -1;

  f = [];
  test: any;
  token = localStorage.getItem('currentUser');
  myorders= [];
  cred: any;

  dataSource = new MatTableDataSource(this.myorders);
  form: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() cards: boolean = true;
  filtermessage:string;


  public firstDate = moment();
  public secondDate = moment();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private ordersService: OrderService,
    //private service: SharedService,
  ) {  }

  ngOnInit() {
    this.ordersService.currentOrders.subscribe((message: Order[]) => {
      this.orders = message})
    this.getTotalCost(this.orders);
  }
  ngAfterViewInit() {
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
      console.log('options', this.opt);
    }
  }
  onRowHighlight(row){
    this.selectedRowIndex = row.id;
  }


/////////////////////////////////////////////////
//          GET ORDERS Total Cost             //
///////////////////////////////////////////////


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

///////////////////////////////////
// modal detail                 //
/////////////////////////////////

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

  sortTable(ordering?) {
    
    let orderingFilter: string;

    switch(this.orderSortCase) {
      case (1):
        orderingFilter = ordering;
        console.log(orderingFilter);
        this.orderSortCase = 2;
          break;
      case(2):
        orderingFilter = '-' + ordering;
        console.log(orderingFilter);
        this.orderSortCase = 1;
        break;
      default:
        orderingFilter = ordering;
        console.log(orderingFilter);
        this.orderSortCase = 2;     
    }


    this.ordersService.setParameters({ordering: orderingFilter})
    this.ordersService.findOrders2();
  }
  
}


/*()

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
*/


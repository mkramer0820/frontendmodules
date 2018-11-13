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
import { OrderExpenseComponent } from '../order-expense/order-expense.component';
import { unescapeIdentifier } from '@angular/compiler';

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
   'ID', 'DUE DATE', 'BUYER', 'FACTORY', 'ORDER TYPE', 'BUYER STYLE #', 'JP STYLE #',
   'FACTORY SHIP DT', 'COST FROM FACTORY', 'BUYER PRICE',
    'QTY','TOT. EXPENSE', 'SWEATER IMG', 'BRAND', 'SWEATER DESCRIPTION',
    'FIBER CONTENT', 'COLOR', 'UPDATE', 'TASKS', 'EXPENSE'];

  tododisplayColumns: string [] = ['todo', 'comment', 'duedate', 'status']

  ///////
  // shared message for order
  /////
  orderTask: boolean = false;
  order: any; // used on row click
  selectedTask: any; // used for sending to modal

  // highlightrow
  selectedRowIndex: number;

  ////// filter pannel
  panelOpenState: boolean;
  urlset = AppConfig.urlOptions.orders;
  opt: any[];
  filterForm: FormGroup;
  filters: any;

  /////////////
  orderSort: string = 'id';
  orderSortCase: number;
  sortVal: any;
  serializedDate = new FormControl(moment().format('YYYY-MM-DD'));
  totalCost: any = {};

  f = [];
  test: any;
  token = localStorage.getItem('currentUser');
  myorders= [];
  cred: any;

  dataSource = new MatTableDataSource(this.myorders);
  form: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(FilterFormComponent) child;

  @Input() cards: boolean = true;
  filtermessage: any;


  public firstDate = moment();
  public secondDate = moment();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private ordersService: OrderService,
  ) {  }

  ngOnInit() {
    this.ordersService.currentOrders.subscribe((message: Order[]) => {
      this.getTotalCost(message);
      console.log(message);
      this.orders = message;
    });
    this.getTotalCost(this.orders);
  }
  ngAfterViewInit() {
    this.getTotalCost(this.orders);
    this.options(this.orders);
    this.filtermessage = this.child.filterForm.value;
    console.log("FILTER MESSAGE", this.filtermessage)
  }
  onRowClicked(row) {
    this.order = row;
    this.selectedTask = row.tasks;

    console.log('Row clicked: ', row);
  }
  options(orders: Order[]) {
    for (let order of orders) {
      this.opt.push(order.buyer_name);
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
    console.log(order['qty']);
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
        return dialogRef.close();
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
        return dialogRef.close();
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
      return dialogRef.close();
    });
  });
}
openUpdateDialog(order): void {
  const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
    width: '700px',
    height: '800px',
    data: {formData: order, url: AppConfig.urlOptions.orders, update: true}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      return dialogRef.close();
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
        return dialogRef.close();
      });
    });
  }

///////////////////////////////////
// modal Expense                //
/////////////////////////////////

openAddExpenseDialog(order): void {
  let update: boolean;
  if (order.orderExpense.length === 0 ) {
    update = false;
  } else { update = true};
  console.log(update)
  const dialogRef = this.dialog.open(OrderExpenseComponent, {
    data: {order: order, url: AppConfig.urlOptions.orderExpense, update: update}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      return dialogRef.close();
    });
  });
}


/////////////////////////////////////////////////////////////////
//            FILTERS                                         //
///////////////////////////////////////////////////////////////

  sortTable(ordering?) {
    this.filtermessage = this.child.filterForm.value;
    let orderingFilter = this.child.filterForm.value;
    console.log(orderingFilter)

    switch(this.orderSortCase) {
      case (1):
        orderingFilter['ordering'] = ordering;
        this.orderSortCase = 2;
          break;
      case(2):
        orderingFilter['ordering'] = '-' + ordering;
        this.orderSortCase = 1;
        break;
      default:
        orderingFilter['ordering'] = ordering;
        this.orderSortCase = 2;
    }

    if (orderingFilter['start_date'] === "") {
      orderingFilter['start_date'] = '';

    } else { orderingFilter['start_date'] = moment(orderingFilter['start_date']).format('YYYY-MM-DD') }
    if (orderingFilter['end_date'] === "") {
      orderingFilter['end_date'] = '';
    } else { orderingFilter['end_date'] = moment(orderingFilter['end_date']).format('YYYY-MM-DD') }

    console.log(orderingFilter)
    this.ordersService.setParameters({
      buyer: orderingFilter['buyers'],
      buyerStyle: orderingFilter['buyer_style_number'],
      dueDateAfter: orderingFilter['start_date'],
      dueDateBefore: orderingFilter['end_date'],
      jpStyle:orderingFilter['jp_style_number'],
      isActive: orderingFilter['isActive'],
      ordering: orderingFilter['ordering']});
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


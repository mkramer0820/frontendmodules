import { Component, OnInit, AfterViewInit,  ViewChild, Input, Inject} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, } from '@angular/forms';
// import {Order} from '../../../modules/models/orders.model';
import {Order, Paginator} from './_service/order.service';
import {AppConfig} from '../../../config/app.config';
import {ApiService} from '../../../config/api.service';
import {MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialogContainer } from '@angular/material';
import {HttpClientService} from 'app/_services/http-client.service';

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
import { Url } from 'url';
import {PageEvent} from '@angular/material';
import {DeleteModalComponent} from '../../../_helpers/delete-modal/delete-modal.component';


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
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
    OrderService,
  ]
})
export class OrdersTableComponent implements OnInit, AfterViewInit {
  orders: Order[];
  //dataSource = new MatTableDataSource();
  displayColumns: string [] = [
    'id', 'due_date', 'buyer_name', 'factory_name', 'order_type', 'buyer_style_number',
    'jp_style_number', 'factory_ship_date', 'cost_from_factory', 'buyers_price',
    'qty', 'total_expense', 'sweater_image', 'brand',/* 'sweater_description', 
    'fiber_content', 'color',*/ 'update', 'tasks' , 'expenses'
  ];
  filterForm: FormGroup;

  tododisplayColumns: string [] = ['todo', 'comment', 'duedate', 'status']
  dialogConfig: MatDialogConfig;
  dialogRow: any;

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

  pageSizeOptions: number[] = [5,10,20,50];
  length: number; 
  totalPages: number = 1;
  next: Url;
  pageSize: number;
  previous: Url;
  pageEvent: PageEvent;


  public firstDate = moment();
  public secondDate = moment();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private ordersService: OrderService,
    private http: HttpClientService,
  ) {  }

  ngOnInit() {
    this.ordersService.findPaginatedOrders()
    this.ordersService.currentOrders.subscribe((orders: Order[]) => {
      this.orders = orders;
      this.length = this.ordersService.url.length;
      this.pageSize = this.ordersService.url.pageSize;
      this.getTotalCost(orders)

     });
    
  }
  ngAfterViewInit() {

  }
  onRowClicked(row) {
    this.order = row;
    this.selectedTask = row.tasks;
    this.dialogRow = row;

  }
  options(orders: Order[]) {
    for (let order of orders) {
      this.opt.push(order.buyer_name);
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
    console.log(this.totalCost)
    return this.totalCost;
  }
////////////////////////////////////////////////////////////////
///         MODAL                 Tasks                    ///
//////////////////////////////////////////////////////////////
  openAddTask(data): void {
    const dialogRef = this.dialog.open(OrderTaskComponent, {
      width: '70%',
      height: '70%',
      data: {url: AppConfig.urlOptions.orderTasks, order: data, update: false}
    });
    dialogRef.afterClosed().subscribe((orders: Order[]) => {
      this.ordersService.findPaginatedOrders();
      this.ordersService.currentOrders.subscribe((orders: Order[]) => {
        this.orders = orders;
        this.length = this.ordersService.url.length;
        this.pageSize = this.ordersService.url.pageSize;
        this.getTotalCost(orders)
  
       })
    })


  }
  openUpdateTask(order): void {
    const dialogRef = this.dialog.open(OrderTaskComponent, {
      width: '70%',
      height: '70%',
      data: {url: AppConfig.urlOptions.orderTasks, order: order, formData: order.tasks, update: true}
    });
    dialogRef.afterClosed().subscribe((orders: Order[]) => {
      this.ordersService.findPaginatedOrders();
      this.ordersService.currentOrders.subscribe((orders: Order[]) => {
        this.orders = orders;
        this.length = this.ordersService.url.length;
        this.pageSize = this.ordersService.url.pageSize;
        this.getTotalCost(orders)
  
       })
    })

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
  dialogRef.afterClosed().subscribe((orders: Order[]) => {
    this.ordersService.findPaginatedOrders();
    this.ordersService.currentOrders.subscribe((orders: Order[]) => {
      this.orders = orders;
      this.length = this.ordersService.url.length;
      this.pageSize = this.ordersService.url.pageSize;
      this.getTotalCost(orders)

     })
  })

}
openUpdateDialog(order): void {

  const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
    width: '700px',
    height: '800px',
    data: {formData: order, url: AppConfig.urlOptions.orders, update: true}
  });
  dialogRef.afterClosed().subscribe((orders: Order[]) => {
    this.ordersService.findPaginatedOrders();
    
  })
}
  openDeleteDialog(order): void {
  const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '700px',
      height: '800px',
      data: {url: AppConfig.urlOptions.orders, id: order.id}
  });
  dialogRef.afterClosed().subscribe((orders: Order[]) => {
    this.ordersService.findPaginatedOrders();
    
  })
}

///////////////////////////////////
// modal detail                 //
/////////////////////////////////

  openDetailDialog(order): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {order:order}
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      data: {order:order},
      autoFocus: false,
      panelClass: 'my-dialog',

    });

  }
///////////////////////////////////
// modal Expense                //
/////////////////////////////////

openAddExpenseDialog(order): void {
  let update: boolean;
  let updateId: number;
  if (order.orderExpense.length === 0 ) {
    update = false;
    updateId = null;

  } else { 
    update = true
    updateId = order.orderExpense[0]['id']
  };
  console.log(update)
  const dialogRef = this.dialog.open(OrderExpenseComponent, {
    data: {order: order, url: AppConfig.urlOptions.orderExpense, update: update, updateId : updateId }
  });
  dialogRef.afterClosed().subscribe((orders: Order[]) => {
    this.ordersService.findPaginatedOrders();
    this.ordersService.currentOrders.subscribe((orders: Order[]) => {
      this.orders = orders;
      this.length = this.ordersService.url.length;
      this.pageSize = this.ordersService.url.pageSize;
      this.getTotalCost(orders)

       })
    })
  }



/////////////////////////////////////////////////////////////////
//            FILTERS                                         //
///////////////////////////////////////////////////////////////

  sortTable(col) {
    console.log(col)
     /*
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
     //this.ordersService.findOrders2(); */
  }
  paginate(col?) {
    let direction: string;
 
    this.ordersService.url.pageSize = this.paginator.pageSize;
    this.ordersService.url.djangoPageNumber = this.paginator.pageIndex + 1;
    if(this.sort.direction === 'asc') {
      direction = col
    } else if ( this.sort.direction === 'desc') {
      direction = '-'+col } else {
      direction = 'id'};
    this.ordersService.url.ordering = direction;
    this.ordersService.findPaginatedOrders()
  }

}

export interface DialogData {
  url: string;
  formData?: any;
  update?: boolean;
}

export interface Orders {
  orders: Order[];
}

export interface Order {
  id: number;
  buyer?: string;
  factory?: string;
  buyer_name?: string;
  factory_name?: string;
  tasks: Task[];
  due_date: string;
  factory_ship_date: string;
  sweater_image?: string;
  factory_set: Factoryset[] | string;
  customer_set: Customerset[] | string;
  orderExpense: OrderExpense[];
  isActive: boolean;
  customer_order_number: string;
  buyer_style_number: string;
  jp_style_number: string;
  cost_from_factory?: number;
  buyers_price?: number;
  order_type?: string;
  qty?: number;
  sweater_description: string;
  brand: string;
  fiber_content: string;
  jp_care_instructions: string;
  color: string;
}

export interface OrderExpense {
  order: number;
  totalExpense: number;
  expenseItems: ExpenseItem[];
}

export interface ExpenseItem {
  expenseItemCost: number;
  expenseItemName: string;
  expenseItemTotal: number;
}

export interface Customerset {
  id: number;
  isActive: boolean;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  phone: string;
  extension: string;
  website: string;
  description: string;
  createdOn: string;
}

export interface Factoryset {
  id: number;
  isActive: boolean;
  name: string;
  contact_name_id: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode?: any;
  country: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  createdOn: string;
}

export interface Task {
  id: number;
  isActive: boolean;
  set_name: string;
  todos_group: string;
  set_status: string;
  todos: Todo[];
  order: number;
}

export interface Todo {
  todo: string;
  status: string;
  comment: string;
  duedate: string;
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


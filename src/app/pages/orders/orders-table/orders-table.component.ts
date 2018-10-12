import { Component, OnInit, Directive,AfterViewInit,  ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Order, Orders} from '../../../modules/models/orders.model';
import {ApiService} from '../../../config/api.service';
// import {OrdersAddComponent} from '../orders-add/orders-add.component';
// import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
import {OrdersSharedService} from '../orders-shared.service';
import {Subscription} from 'rxjs';
import {map, merge, filter} from 'rxjs/operators';
import {Factory} from '../../../modules/models/factory.model';
import {Customer} from '../../../modules/models/customer.model';
import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
import {MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator, MatSortModule, MatSort, MatTab } from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../_services';
import {TaskComponent} from '../../task/task.component';
import { TaskSetComponent } from '../../task/create-task-set/task-set.component';
import {ModalService} from '../../_services/modal.service';
import {TaskGroupService} from '../../task/_service/task-group.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  providers: []
})
export class OrdersTableComponent implements OnInit, AfterViewInit {
  orders: Order[];
  dataSource = new MatTableDataSource();
  displayColumns: string [] = [
   'ID', 'DUE DATE', 'BUYER', 'FACTORY', 'ORDER NUMBER', 'BUYER STYLE #', 'JP STYLE #',
   'FACTORY SHIP DT', 'COST FROM FACTORY', 'BUYER PRICE',
    'ORDER TYPE', 'QTY', 'SWEATER IMG', 'SWEATER DESCRIPTION',
    'BRAND', 'FIBER CONTENT', 'COLOR', 'UPDATE', 'TASKS'
  ]

  ///////
  // shared message for order
  /////
  databaseId: string;
  orderTask: boolean = false;
  sentGroups: any;


  ////

  message: string;
  factoryMessage: Factory[];
  buyerMessage: Customer[];
  subscription: Subscription;
  factory: Factory[];
  f = [];
  test: any;
  token = localStorage.getItem('currentUser');
 //myorders= [];

 //dataSource = new MatTableDataSource(this.myorders);

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
    //private service: SharedService,
  ) { }

  ngOnInit() {
    this.getOrders();
    this.tgs.getTaskGroups();
  }
  
  ngAfterViewInit() {
   /*
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadLessonsPage())
        )
        .subscribe();
        */
  }
  onRowClicked(row) {
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


  getOrders() {
    this.apiService.getOrders().subscribe((orders: Array<Order>) => {
      this.orders = orders;
      // console.log(Object.keys(orders));
      
      const source = [];
      for (const index in orders) {
        let obj = orders[index];
        source.push(obj);
      }
      console.log(source);
      this.dataSource = new MatTableDataSource(source);
     // console.log(orders)
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
  openOrderTaskDialog(id): void {
    this.getTaskGroup();
    this.databaseId = id;
    const dialogRef = this.dialog.open(TaskComponent, {
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
  openModal(id: string, databaseId) {
    this.orderTask = false;
    this.databaseId = databaseId;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    
    this.modalService.close(id);
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

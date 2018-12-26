import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Customer} from '../../../modules/models/customer.model';
import {ApiService} from '../../../config/api.service';
import {SharedService} from '../shared.service';
import {Subscription} from 'rxjs';
import {BehaviorSubject, pipe, Observable} from 'rxjs';
import {MatSort, MatTableDataSource, MatTable, MatPaginator} from '@angular/material';

import {DynamicFormRequestComponent} from '../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import {MessageService} from '../../../_services/message.service';
import { AppConfig } from '../../../config/app.config';
import {DeleteModalComponent} from '../../../_helpers/delete-modal/delete-modal.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  customers: Customer[];
  displayedColumns: string[] = [
    'id', 'name', 'address1', 'address2', 'address3', 'city', 'state',
    'zipcode', 'country', 'email', 'phone', 'extension', 'website', 'description', 
    'update', 'delete']
  customerUrl = 'customer/'
  selectedrow: any;
  dataSource = new  MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private service: SharedService,
    private msgServ: MessageService
  ) { this.msgServ.sendUrl(AppConfig.urlOptions.customer)
  }

  ngOnInit() {
    this.getCustomers();
    this.sendUrl(this.customerUrl);
    
  }
  sendMessage(message): void {
        // send message to subscribers via observable subject
        this.service.sendMessage(message);
    }
  clearMessage(): void {
          // clear message
          this.service.clearMessage();
  }
  
  setUrl() {
    const url = AppConfig.urlOptions.customer;
    console.log(url);
    return this.msgServ.sendUrl(url);
  }

  getCustomers() {
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource(customers)
      this.dataSource.sort = this.sorted();
      this.dataSource.paginator = this.paginator;

    })
  }
  sorted() {
    return this.dataSource.sort = this.sort
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onRowClicked(row) {
    this.selectedrow = row;
    console.log(this.selectedrow);
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.customer, update: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
        this.dataSource = new MatTableDataSource(customers)
      });
    });
  }
  openUpdateDialog(customerdata): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.customer, formData: customerdata, update: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
        this.dataSource = new MatTableDataSource(customers)
      });
    });
  }
  openDeleteDialog(customer): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {url: AppConfig.urlOptions.customer, id: customer.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
        this.dataSource = new MatTableDataSource(customers)
      });

    });
   }
}

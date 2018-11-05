import { Component, OnInit} from '@angular/core';
import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Customer} from '../../../modules/models/customer.model';
import {ApiService} from '../../../config/api.service';
import {SharedService} from '../shared.service';
import {Subscription} from 'rxjs';
import {DynamicFormRequestComponent} from '../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import {MessageService} from '../../../_services/message.service';
import { AppComponent } from 'src/app/app.component';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  customers: Customer[];
  displayedColumns: string[] = [
    'ID', 'NAME', 'ADDRESS1', 'ADDRESS2', 'ADDRESS3', "CITY",
    'STATE', 'ZIP', 'COUNTRY', 'EMAIL', 'PHONE', 'EXT',
    'WEBSITE', 'DESCRIPTION', 'UPDATE',
  ];
  message: any;
  subscription: Subscription;
  recieve: any;
  customerUrl = 'customer/'
  selectedrow: any;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private service: SharedService,
    private msgServ: MessageService
  ) { this.msgServ.sendUrl(AppConfig.urlOptions.customer)
  }

  ngOnInit() {
    this.getCustomers();
    this.subscription = this.service.getMessage().subscribe(message => this.recieve = message);
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
  sendUrl(message): void {
    // send message to subscribers via observable subject
    this.msgServ.sendUrl(message);
  }



  getCustomers() {
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers;
    });
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
        this.customers = customers;
        result = this.customers;
        console.log(result)

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
        this.customers = customers;
        result = this.customers;
        console.log(result);

      });
    });
  }
}

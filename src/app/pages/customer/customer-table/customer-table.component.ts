import { Component, OnInit} from '@angular/core';
import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Customer} from '../../../modules/models/customer.model';
import {ApiService} from '../../../config/api.service';
import {CustomerAddFormComponent} from '../customer-add/customer-add-form.component';
//import {CustomerService} from '../../customer.service';
import {SharedService} from '../shared.service';
//import {CustomerUpdateComponent} from '../customer-update/customer-update.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  customers: Customer[];
  displayedColumns: string[] = [
    'ID', 'NAME', 'ADDRESS1', 'ADDRESS2', 'ADDRESS3',
    'COUNTRY', 'STATE', 'ZIP', 'EMAIL', 'PHONE',
    'WEBSITE', 'DESCRIPTION', 'UPDATE',
  ];
  message: any;
  subscription: Subscription;
  recieve: any;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private service: SharedService,
  ) {
  }

  ngOnInit() {
    this.getCustomers();
    this.subscription = this.service.getMessage().subscribe(message => this.recieve = message);
  }
  sendMessage(message): void {
        // send message to subscribers via observable subject
        this.service.sendMessage(message);
    }
  clearMessage(): void {
          // clear message
          this.service.clearMessage();
        }


  getCustomers() {
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers;
    });
  }
  openUpdateDialog(id): void {
    const dialogRef = this.dialog.open(CustomerAddFormComponent, {
      width: '700px',
    });
    this.apiService.getCustomerDetail(id).subscribe((response: any) => {
      this.message = response;
      this.sendMessage(this.message)
      this.subscription = this.service.getMessage().subscribe(message =>
         this.recieve = message);
      //let message = this.recieve;
      //this.recieve = message;
      console.log(this.recieve)
    });
    dialogRef.afterOpen().subscribe(result => {
      console.log(`Dailog result: ${result}`)
    });
    /*this.apiService.getCustomerDetail(id).subscribe((response: any) => {
      this.message = response;
      //console.log(response)
      this.sendMessage(this.message)
      this.subscription = this.service.getMessage().subscribe(message => this.recieve = message);
      console.log(this.recieve)
        //return this.service.setCustomerData(response);
        //this.customer = this.service.getCustomerData()
        //console.log(customers);
        //this.customer = customers;
        //this.service.setOption(customers);
      });*/
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
        this.customers = customers;
        return dialogRef.close()
        //console.log(customers);
      });
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(CustomerAddFormComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
        this.customers = customers;
        //console.log(customers);
      });
    });
  }
}

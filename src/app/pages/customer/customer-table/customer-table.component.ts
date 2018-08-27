import { Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Customer} from '../../../modules/models/customer.model';
import {ApiService} from '../../../config/api.service';
import {CustomerAddFormComponent} from '../customer-add/customer-add-form.component';


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
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers;
      console.log(customers);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerAddFormComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
        this.customers = customers;
        console.log(customers);
      });
    });
  }
  openUpdateDialog(id): void {
    const dialogRef = this.dialog.open(CustomerAddFormComponent, {
      width: '700px',
    });
    dialogRef.afterOpen().subscribe(result => {
      this.apiService.getCustomerDetail(id).subscribe((customers: Object) => {
        console.log(customers);
      });
    });
  }
}

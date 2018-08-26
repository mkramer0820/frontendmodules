import { Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Customer} from '../../../modules/models/customer.model';
import {ApiService} from '../../../config/api.service';



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
    'WEBSITE', 'DESCRIPTION'
  ];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.printCustomer();
  }
  getCustomers() {
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers;
      console.log(customers);
    });
  }
  printCustomer() {
    console.log(this.customers);
  }
}

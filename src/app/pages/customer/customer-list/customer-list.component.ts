import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../config/api.service';
import { Customer } from  '../../../modules/models/customer.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  // private customer: Array<object> = [];
  customers: Customer[];
  newCustomerForm: FormGroup;
  addCustomerDialogRef: MatDialogRef<AddCustomerComponent>;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ){
    this.newCustomerForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required]),
      'address1': new FormControl(''),
      'address2': new FormControl(''),
      'address3': new FormControl(''),
      'country': new FormControl(''),
      'state': new FormControl(''),
      'zip': new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl(''),
      'website': new FormControl(''),
      'description': new FormControl(''),
    });
   }
    ngOnInit() {
      this.getCustomers();
    }

  public getCustomers(){
     this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {
        this.customers = customers;
        console.log(customers);
     });
  }

  public openAddCustomerDialog() {
    this.addCustomerDialogRef = this.dialog.open(this.newCustomerForm);

  }
}

import {Component, Inject, OnInit} from '@angular/core';
import { ApiService } from '../../../config/api.service';
import { Customer } from  '../../../modules/models/customer.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';





@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  // private customer: Array<object> = [];
  customers: Customer[];
  newCustomerForm: FormGroup;


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
}

export interface DialogData {
  id: number;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  country: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  website: string;
  description: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'customer-add',
  templateUrl: 'dialog-overview-example.html',
})
export class CustomerAddComponent {
  id: number;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  country: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  website: string;
  description: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerAddDialogComponent, {
      width: '250px',
      data: {
        id: this.id,
        name: this.name,
        address1: this.address1,
        address2: this.address2,
        address3: this.address3,
        country: this.country,
        state: this.state,
        zip: this.zip,
        email: this.email,
        phone: this.phone,
        website: this.website,
        description: this.description,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

}

@Component({
  selector: 'customer-add-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class CustomerAddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomerAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


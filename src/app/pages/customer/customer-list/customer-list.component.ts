import {Component, Inject, OnInit} from '@angular/core';
import { ApiService } from '../../../config/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Customer} from '../../../modules/models/customer.model';
import {EditorType} from '../customer.component';
import {CustomerAddFormComponent} from '../customer-add/customer-add-form.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  // private customer: Array<object> = [];
  customers: Customer[];
  newCustomerForm: FormGroup;
  customer: Customer;
  editor: EditorType = 'customer';

  toggleEditor(type: EditorType) {
    this.editor = type;
  }

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
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

  public getCustomers() {
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
}

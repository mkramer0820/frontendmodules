import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import { Validators, FormArray } from '@angular/forms';
import {Customer} from '../../../modules/models/customer.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SharedService} from '../shared.service';



@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {

  customerForm = this.fb.group({
    name: ['', Validators.required],
    address1: [''],
    address2: [''],
    address3: [''],
    country: [''],
    state: [''],
    zip: [''],
    email: [''],
    phone: [''],
    website: [''],
    description: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<CustomerUpdateComponent>,
    public fb: FormBuilder,
    public service: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.customerForm = this.fb.group({
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
  }


  closeDialog() {
    this.dialogRef.close('Updated')
  }
}

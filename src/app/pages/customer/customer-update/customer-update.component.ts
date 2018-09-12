import { Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {ApiService} from '../../../config/api.service';
import {Customer} from '../../../modules/models/customer.model';
//import {CustomerService} from '../../customer.service';
import {SharedService} from '../shared.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit, OnDestroy {

  customers: Customer[];
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
  }); //turn semicolon to commma to add nested json
  //tasks: this.fb.array([
  //  this.fb.control('')
  //])
  //});

  customer: Customer[];
  subscription: Subscription;
  name: string;
  phone: string;



  constructor(
    private fb: FormBuilder,
    private  apiService: ApiService,
    private service: SharedService,
  ) {
    //this.subscription = this.service.getMessage().subscribe(message => { this.message = message; });
    this.customerForm = this.fb.group({
      'name': new FormControl(''),
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
        this.custMessage();
    }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  custMessage(){
    this.subscription = this.service.getMessage().subscribe(message => {
       this.customer = message;
      });
    }

  updateCustomer() {
    const customer = this.customerForm.value;
    const id = this.customer['id'];
    console.log(id)
    this.apiService.updateCustomer(customer, id).subscribe((response) => {
      console.log(response);
      this.customerForm.reset();
    });
  }
}



/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

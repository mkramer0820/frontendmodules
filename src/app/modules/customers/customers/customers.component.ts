import { Component, OnInit, ViewChild } from '@angular/core';
import {Customer} from '../../models/customer.model';
import {CustomersService } from '../customers.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {LoggerService} from '../../../core/services/logger.service';
import {AppConfig} from '../../../config/app.config';

//RouterModule.forChild(routes)


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  newCustomerForm: FormGroup;
  error: string;
  @ViewChild('form') myNgForm //just to call restForm method

  constructor(private customersService: CustomersService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.newCustomerForm = this.formBuilder.group({
      ' name': new FormControl('', [Validators.required]),
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
    this.customersService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers
    });
  }
}

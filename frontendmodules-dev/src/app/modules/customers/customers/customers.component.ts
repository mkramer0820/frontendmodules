import { Component, OnInit, ViewChild } from '@angular/core';
import {Customer} from '../../models/customer.model';
import {CustomersService } from '../customers.service';
//import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//import {MatDialog} from '@angular/material';
//import {Router} from '@angular/router';
//import {LoggerService} from '../../../core/services/logger.service';
//import {AppConfig} from '../../../config/app.config';

//RouterModule.forChild(routes)


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers:Customer[];
  //newCustomerForm: FormGroup;
  error: string;
  @ViewChild('form') myNgForm //just to call restForm method

  constructor(private customersService: CustomersService)
   {
     this.customersService.getCustomers().subscribe((customerlist: Array<Customer>) => {
     this.customers = customerlist;
       console.log(customerlist)
     });
   }

  ngOnInit() {
    //this.getCustomerList()
    }
    /*
    getCustomerList() {
    this.customersService.getCustomers().subscribe((customerlist: Array<Customer>) => {
    this.customers = customerlist;
      console.log(customerlist)
    })
  }*/
}

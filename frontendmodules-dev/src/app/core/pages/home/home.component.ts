import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Customer} from '../../../modules/models/customer.model';
import {CustomersService} from '../../../modules/customers/customers.service';
import {AppConfig} from '../../../config/app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomePage implements OnInit {
  customers: Customer[] = null;

  constructor(private customerService: CustomersService,
              private router: Router) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers
    });
  }

  seeCustomerDetails(customer): void {
    if (customer.default) {
      this.router.navigate([AppConfig.routes.customer + '/' + customer.id]);
    }
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';
import {MatMenuTrigger} from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appConfig: any;
  menuItems: any[];


  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig) {
    this.appConfig = appConfig
    this.loadMenus();
   }


  ngOnInit() {
  }

private loadMenus(): void {
  this.menuItems = [
    {link: 'customer-add', name: ('Add Customer')},
    {link: 'customer-table', name: ('View All Customers')},
    {link: 'order-add', name:('Add Order')},
    {link: 'order-table', name:('Orders')},
    {link: 'factory-add', name: ('Add Factory')},
    {link: 'factory-table', name: ('View all Factories')},
    ];
}
}

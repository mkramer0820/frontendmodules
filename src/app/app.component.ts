import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
//import {Meta, Title} from '@angular/platform-browser';
//import {NavigationEnd, Router} from '@angular/router';
//import {AppConfig} from './config/app.config';
//import {MatSnackBar} from '@angular/material';
import {VERSION} from '@angular/material';
import {NavItem} from './core/nav/nav-item';
import {NavService} from './nav.service';





//declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  isOnline: boolean;

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
  {
    displayName: 'Customers',
    iconName: 'my_customer',
    children: [
      {
        displayName: 'Add Customer',
        iconName: 'add',
        route: 'customer-add',
      },
      {
        displayName: 'View Customers',
        iconName: 'view',
        route: 'customer-table',
      },
    ]},
    {
    displayName: 'Factories',
    iconName: '',
    children: [
      {
        displayName: 'Add Factory',
        iconName: 'add',
        route: 'factory-add',
      },
      {
        displayName: 'View Factories',
        iconName: 'view',
        route: 'factory-table',
      },
      {
        displayName: 'Factory Contact Book',
        iconName: 'person',
        route: 'factory-contact',
      },
    ]},
    {
      displayName: 'Orders',
      iconName: 'my_customer',
      children: [
        {
          displayName: 'Add Order',
          iconName: 'add',
          route: 'order-add',
        },
        {
          displayName: 'View Orders',
          iconName: 'view',
          route: 'order-table',
        },
        {
          displayName: 'Upload Image',
          iconName: 'upload',
          route: 'order-image-upload',
        },
        {
          displayName: 'Add New Order',
          iconName: 'add',
          route: 'order-add',
        },
      ]},
      {
        displayName: 'Tasks',
        iconName: '',
        children: [
          {
            displayName: 'Add Task Set',
            iconName: 'add',
            route: 'task-set',
          },
          {
            displayName: 'Update Task',
            iconName: 'update',
            route: 'task-form',
          },
        ]},
  ];

  constructor(//private title: Title,
              //private meta: Meta,
              //private snackBar: MatSnackBar,
              //private router: Router,
              private navService: NavService,
            ) {
    this.isOnline = navigator.onLine;
  }
/*
ngOnInit() {
  this.title.setTitle('Front End On Init');
   this.router.events.subscribe((event: any) => {
     if (event instanceof NavigationEnd) {
       switch (event.urlAfterRedirects) {
         case '/':
           this.meta.updateTag({
             name: 'description',
             content: 'Angular Example app with Angular CLI, Angular Material and more'
           });
           break;
         case '/' + AppConfig.routes.customer:
           this.title.setTitle('Customer list');
           this.meta.updateTag({
             name: 'description',
             content: 'List of Customers'
           });
           break;
       }
     }
   });
   this.checkBrowserFeatures();
 }
 checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }
    if (!supported) {
        this.snackBar.open('updateBrowser', 'OK');
    }

    return supported;
  }*/
  ngAfterViewInit() {
   this.navService.appDrawer = this.appDrawer;
 }
}

import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  isOnline: boolean;
  token_expires: any;
  username: string;
  hidden: boolean;

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Home',
      iconName: 'home',
      class: 'primary-accent',
      route: 'home'
    },
    {
    displayName: 'Customers',
    iconName: 'my_customer',
    class: 'primary-accent',
    children: [
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
          displayName: 'View Orders',
          iconName: 'view',
          route: 'order-table',
        },
        {
          displayName: 'Order Task',
          iconName: 'add',
          route: 'order-task',
        },
      ]},
      {
        displayName: 'Tasks',
        iconName: '',
        children: [
          {
            displayName: 'Add Todos New',
            iconName: 'add',
            route: 'task',
          },
        ]},
      {
      displayName: 'Add Task Group',
      iconName: 'add',
      route: 'add-task-group',
      },
      {
        displayName: 'Work Space',
        iconName: 'add',
        route: 'jp-task-forms-component',
      }

  ];
  constructor(//private title: Title,
              //private meta: Meta,
              //private snackBar: MatSnackBar,
              //private router: Router,
              private navService: NavService,
            ) {
    this.isOnline = navigator.onLine;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  updateData() {
    let token = localStorage.getItem('currentUser');
    let errors = [];

    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    if (this.username) {
      this.hidden === false;
    }
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

}

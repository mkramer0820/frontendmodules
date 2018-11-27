import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit} from '@angular/core';
//import {Meta, Title} from '@angular/platform-browser';
//import {NavigationEnd, Router} from '@angular/router';
//import {AppConfig} from './config/app.config';
//import {MatSnackBar} from '@angular/material';
import {VERSION} from '@angular/material';
import {NavItem} from './core/nav/nav-item';
import {NavService} from './nav.service';




import { Observable } from 'rxjs/Observable';



//declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements  AfterViewInit {
  isOnline: boolean;
  token_expires: any;
  username: string;
  hidden: boolean;
  notification: string;
  showNotification: boolean;

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
    iconName: 'people_outline',
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
    iconName: 'business',
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
      iconName: 'attach_money',
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
        iconName: 'done',
        children: [
          {
            displayName: 'Add / Delete Tasks',
            iconName: 'add',
            route: 'task',
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

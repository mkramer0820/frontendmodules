import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit} from '@angular/core';
//import {Meta, Title} from '@angular/platform-browser';
//import {NavigationEnd, Router} from '@angular/router';
//import {AppConfig} from './config/app.config';
//import {MatSnackBar} from '@angular/material';
import {VERSION} from '@angular/material';
import {NavItem} from './core/nav/nav-item';
import {NavService} from './nav.service';
import {Observable} from 'rxjs';
import {ThemeService} from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit,  AfterViewInit {
  isOnline: boolean;
  token_expires: any;
  username: string;
  hidden: boolean;
  notification: string;
  showNotification: boolean;
  isDarkTheme: Observable<boolean>;

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
              private themeService: ThemeService,

            ) {
    this.isOnline = navigator.onLine;
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    console.log(this.isDarkTheme)
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
 
 }


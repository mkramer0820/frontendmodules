import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {AppConfig} from './config/app.config';
import {MatSnackBar} from '@angular/material';




declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isOnline: boolean;

    constructor(private title: Title,
                private meta: Meta,
                private snackBar: MatSnackBar,
                private router: Router) {
      this.isOnline = navigator.onLine;
    }

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
  }
}

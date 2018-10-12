import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CustomersService} from '.././modules/customers/customers.service';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoggerService} from './services/logger.service';
import { HomePage } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import {ApiService} from '../config/api.service';
import { MenuListItemComponent } from './nav/menu-list-item/menu-list-item.component';
import { TopNavComponent } from './nav/top-nav/top-nav.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    // HomePage,
    // Error404Page,
    HomePage,
    Error404Component,
    MenuListItemComponent,
    TopNavComponent,
  ],
  exports: [
    
    TopNavComponent,
    MenuListItemComponent,

  ],
  providers: [
    CustomersService,
    LoggerService,
    ApiService,

  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

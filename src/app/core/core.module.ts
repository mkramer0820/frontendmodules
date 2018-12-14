import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoggerService} from './services/logger.service';
import { Error404Component } from './pages/error404/error404.component';
import {ApiService} from '../config/api.service';
import { MenuListItemComponent } from './nav/menu-list-item/menu-list-item.component';
import { TopNavComponent } from './nav/top-nav/top-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    
    LayoutModule,
  ],
  declarations: [
    // HomePage,
    // Error404Page,
    Error404Component,
    MenuListItemComponent,
    TopNavComponent,
  ],
  exports: [
    TopNavComponent,
    MenuListItemComponent,
  ],
  providers: [
    LoggerService,
    ApiService,

  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

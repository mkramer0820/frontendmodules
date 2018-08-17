import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CustomerService} from '../modules/customers/customers.service';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoggerService} from './services/logger.service';

//import { Home }

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [],
  providers: [
    CustomersService,
    LoggerService
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersComponent} from './customers/customers.component';
import {RouterModule, Routes} from '@angular/router';


const customersRoutes: Routes = [
  {path: '', redirectTo: '/customers', pathMatch: 'full'},
  // {path: '', component: HomePage},
  // {path: AppConfig.routes.error404, component: Error404Page},
  {path: 'customers', component: CustomersComponent},
  // {path: 'customers/:id', component: CustomersDetaiComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(customersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomersRoutingModule { }

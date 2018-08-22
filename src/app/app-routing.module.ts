import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppConfig} from './config/app.config';
import {CustomerListComponent} from './pages/customer/customer-list/customer-list.component';
// import {HomePage} from './core/pages/home/home.page';
// import {Error404Page} from './core/pages/error404/error404.page';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: AppConfig.routes.customer, loadChildren: './modules/customers/customers.module#CustomersModule'},
  {path: 'customer-list', component: CustomerListComponent}
  // {path: '', component: HomePage},
  // {path: AppConfig.routes.error404, component: Error404Page},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
